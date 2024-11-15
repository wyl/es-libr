import { IncomingMessage } from 'node:http'

import Koa from 'koa'
import { ObjectId } from 'mongodb'
import { ParamData } from 'path-to-regexp'
import { TransHandler } from '.'
import { logger } from '../../../logger'
import { indexMapping, mongoDb } from '../../global'
import { isStatusOk, traceLog } from '../../lib'
import { LiteTransformer } from '../lite-transformer'

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
        const currMapping = indexMapping()[index]?.mapping()
        req
          .on('data', (data) => {
            body += data.toString()
          })
          .on('end', () => {
            const { doc, ...otherFields } = JSON.parse(body || '{}')
            const trans = new LiteTransformer(doc, currMapping)

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
