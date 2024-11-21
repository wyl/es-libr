import { IncomingMessage } from 'node:http'

import { LiteTransformer } from '@eslibr/core/lite-transformer'
import { getLinkNode, mongoDb } from '@eslibr/init'
import { isStatusOk, traceLog } from '@eslibr/lib'
import { logger } from '@eslibr/logger'
import Koa from 'koa'
import { ParamData } from 'path-to-regexp'
import { TransHandler } from '.'

export const _createHandler: TransHandler = (
  req: IncomingMessage,
  res: Koa.Response,
  params: ParamData,
) => {
  const { index, _id } = params as {
    index: string
    _id: string
  }
  let body = ''

  return [
    async () =>
      new Promise<string>((resolve, reject) => {
        req
          .on('data', (data) => {
            body += data.toString()
          })
          .on('end', async () => {
            const doc = JSON.parse(body || '{}')

            const linkNode = getLinkNode(index)

            const trans = new LiteTransformer(doc, linkNode)
            resolve(JSON.stringify(trans.makeLiteBody()))
          })
          .on('error', (err) => reject(err))
      }),

    async () => {
      if (!isStatusOk(res.status)) {
        logger.error(`Create status failed: ${res.status} `)
        return
      }

      const doc = JSON.parse(body || '{}')

      await traceLog('Mongo', () =>
        mongoDb.collection<{ _id: string }>(index).insertOne({ ...doc, _id }),
      ).then((it) => {
        logger.trace(it)
        return it
      })
    },
  ]
}
