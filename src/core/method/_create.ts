import { IncomingMessage } from 'node:http'

import { LiteTransformer } from '@eslibr/core/lite-transformer'
import { getLinkNode } from '@eslibr/init'
import { isStatusOk } from '@eslibr/lib'
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

  const linkNode = getLinkNode(index)
  if (!linkNode) {
    return [undefined, undefined]
  }
  return [
    async () =>
      new Promise<string>((resolve, reject) => {
        req
          .on('data', (data) => {
            body += data.toString()
          })
          .on('end', async () => {
            const doc = JSON.parse(body || '{}')

            const trans = new LiteTransformer(doc, linkNode)
            resolve(JSON.stringify(trans.makeLiteBody()))
          })
          .on('error', (err) => reject(err))
      }),

    async () => {
      if (!isStatusOk(res.status)) {
        logger.error(
          `Create status failed with id: ${_id} stauts is ${res.status} `,
        )
        return
      }
    },
  ]
}
