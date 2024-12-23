import { IncomingMessage } from 'node:http'
import streamEach from 'stream-each'
import through2 from 'through2'

import { LiteTransformer } from '@eslibr/core/lite-transformer'
import { getLinkNode } from '@eslibr/init'
import { isStatusOk } from '@eslibr/lib'
import { logger } from '@eslibr/logger'
import Koa from 'koa'
import ndjson from 'ndjson'
import { ParamData } from 'path-to-regexp'
import { TransHandler } from '.'

export const _bulkHandler: TransHandler = (
  req: IncomingMessage,
  res: Koa.Response,
  params: ParamData,
) => {
  const { target } = params as { target: string | undefined }
  let _index: string = target || ''

  return [
    async () => {
      // let [_id, _type] = ['', '']
      const lines = through2.obj()

      return new Promise<string>((resolve, reject) => {
        let body = ''
        streamEach(
          req.pipe(ndjson.parse()),
          (data, next) => {
            const ndObj = data as object
            const dataKeys = Object.keys(ndObj || {})

            if (
              ['index', 'delete', 'create', 'update'].some((key) =>
                dataKeys.includes(key),
              )
            ) {
              // _type = dataKeys.at(0) || ''
              // _id = Object.values(ndObj).at(0)['_id']
              _index = Object.values(ndObj).at(0)['_index'] || _index
            }
            const linkNode = getLinkNode(_index)

            if (dataKeys.length === 1 && 'doc' in dataKeys) {
              const { doc, ...otherDoc } = ndObj as { doc: object }
              const trans = new LiteTransformer(doc, linkNode)
              lines.write({ doc: trans.makeLiteBody(), ...otherDoc })
            } else {
              const trans = new LiteTransformer(ndObj, linkNode)
              lines.write(trans.makeLiteBody())
            }
            next()
          },
          (err) => {
            if (err) {
              console.log('error', err)
            }
            lines.end()
          },
        )

        lines
          .pipe(ndjson.stringify())
          .on('data', (data) => (body += data))
          .on('end', () => {
            resolve(body)
          })
          .on('error', (err) => reject(err))
      })
    },

    async () => {
      if (!isStatusOk(res.status)) {
        logger.error(`Bulk status failed: ${res.status}`)
        return
      }
    },
  ]
}
