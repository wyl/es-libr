import Koa from 'koa'
import { IncomingMessage } from 'node:http'
import { ParamData } from 'path-to-regexp'

import { LiteTransformer } from '@eslibr/core/lite-transformer'
import { getLinkNode } from '@eslibr/init'
import { isStatusOk } from '@eslibr/lib'
import { logger } from '@eslibr/logger'
import { TransHandler } from '.'

export const _updateHandler: TransHandler = (
  req: IncomingMessage,
  res: Koa.Response,
  params: ParamData,
) => {
  const { index, _id } = params as { index: string; _id: string }
  let body = ''
  const linkNode = getLinkNode(index)
  if (!linkNode) {
    return [undefined, undefined]
  }

  return [
    async () =>
      new Promise((resolve, reject) => {
        req
          .on('data', (data) => {
            body += data.toString()
          })
          .on('end', () => {
            const { doc, ...otherFields } = JSON.parse(body || '{}')

            const trans = new LiteTransformer(doc, linkNode)

            resolve(
              JSON.stringify({ doc: trans.makeLiteBody(), ...otherFields }),
            )
          })
          .on('error', (err) => reject(err))
      }),

    async () => {
      if (!isStatusOk(res.status)) {
        logger.error(
          `Update status failed with id: ${_id} stauts is ${res.status}`,
        )
        return
      }
    },
  ]
}
