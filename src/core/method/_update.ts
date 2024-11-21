import Koa from 'koa'
import { ObjectId } from 'mongodb'
import { IncomingMessage } from 'node:http'
import { ParamData } from 'path-to-regexp'

import { LiteTransformer } from '@eslibr/core/lite-transformer'
import { getLinkNode, mongoDb } from '@eslibr/init'
import { isStatusOk, traceLog } from '@eslibr/lib'
import { logger } from '@eslibr/logger'
import { TransHandler } from '.'

export const _updateHandler: TransHandler = (
  req: IncomingMessage,
  res: Koa.Response,
  params: ParamData,
) => {
  const { index, _id } = params as { index: string; _id: string }
  let body = ''

  return [
    async () =>
      new Promise((resolve, reject) => {
        req
          .on('data', (data) => {
            body += data.toString()
          })
          .on('end', () => {
            const { doc, ...otherFields } = JSON.parse(body || '{}')
            const linkNode = getLinkNode(index)

            const trans = new LiteTransformer(doc, linkNode)

            resolve(
              JSON.stringify({ doc: trans.makeLiteBody(), ...otherFields }),
            )
          })
          .on('error', (err) => reject(err))
      }),

    async () => {
      if (!isStatusOk(res.status)) {
        logger.error(`Update status failed: ${res.status}`)
        return
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { doc, ...otherFields } = JSON.parse(body || '{}')
      await traceLog('Mongo', () =>
        mongoDb
          .collection(index)
          .updateOne(
            { _id: { $eq: new ObjectId(_id.padStart(24, '0')) } },
            { $set: doc },
            { upsert: true },
          ),
      ).then((it) => {
        logger.trace(it)
        return it
      })
    },
  ]
}
