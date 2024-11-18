import { IncomingMessage } from 'node:http'

import { LiteTransformer } from '@eslibr/core/lite-transformer'
import { indexMapping, mongoDb } from '@eslibr/global'
import { isStatusOk, traceLog } from '@eslibr/lib'
import { logger } from '@eslibr/logger'
import Koa from 'koa'
import { ObjectId } from 'mongodb'
import { ParamData } from 'path-to-regexp'
import { TransHandler } from '.'

export const _createHandler: TransHandler = (
  req: IncomingMessage,
  res: Koa.Response,
  params: ParamData,
) => {
  const { index, _id } = params as { index: string; _id: string }
  let body = ''

  return [
    async () =>
      new Promise<string>((resolve, reject) => {
        const currMapping = indexMapping()[index]?.mapping()
        req
          .on('data', (data) => {
            body += data.toString()
          })
          .on('end', async () => {
            const doc = JSON.parse(body || '{}')
            const trans = new LiteTransformer(doc, currMapping)
            trans.makeLiteBody()
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
        mongoDb
          .collection(index)
          .insertOne({ ...doc, _id: new ObjectId(_id.padStart(24, '0')) }),
      ).then((it) => {
        logger.trace(it)
        return it
      })
    },
  ]
}
