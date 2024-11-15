import { IncomingMessage } from 'node:http'
import { indexMapping, mongoDb } from '../../global'
import { ElasticsearchResponse } from '../../types'
import { LiteTransformer } from '../lite-transformer'

import Koa from 'koa'
import { ObjectId } from 'mongodb'
import { ParamData } from 'path-to-regexp'
import { isStatusOk, traceLog } from '../../lib'
import { TransHandler } from '.'

export const _searchHandler: TransHandler = (
  req: IncomingMessage,
  res: Koa.Response,
  params: ParamData,
) => {
  const { target } = params as { target: string }
  let _source: Array<string> = []
  return [
    async () =>
      new Promise<string>((resolve, reject) => {
        let body = ''
        const currMapping = indexMapping()[target].mapping()
        req
          .on('data', (data) => {
            body += data.toString()
          })
          .on('end', () => {
            const reqBody = JSON.parse(body || '{}')
            _source = reqBody._source
            const trans = new LiteTransformer(reqBody, currMapping)
            resolve(JSON.stringify(trans.makeLiteSearch()))
          })
          .on('error', (err) => reject(err))
      }),

    async () => {
      if (isStatusOk(res.status)) {
        const resData =
          (res.body as ElasticsearchResponse<Record<string, string>>).hits
            ?.hits || []
        const ids = resData.map((it) => new ObjectId(it._id.padStart(24, '0')))

        const documents = await traceLog(
          `Mongo`,
          () =>
            mongoDb
              .collection(target)
              .find(
                { _id: { $in: ids } },
                {
                  projection: Object.fromEntries(_source.map((it) => [it, 1])),
                },
              )
              .toArray(),
          [target],
        )

        resData.forEach((data) => {
          const rawData = documents?.find((it) => {
            return it._id.toString() === data._id.padStart(24, '0')
          })
          if (rawData) {
            data._source = rawData
          }
        })
      }
    },
  ]
}
