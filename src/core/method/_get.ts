import { IncomingMessage } from 'node:http'
import { mongoDb } from '../../global'
import { ElasticSearchHits } from '../../types'

import Koa from 'koa'
import { ObjectId } from 'mongodb'
import { ParamData } from 'path-to-regexp'
import { TransHandler } from '.'
import { isStatusOk, traceLog } from '../../lib'

export const _getHandler: TransHandler = (
  req: IncomingMessage,
  res: Koa.Response,
  params: ParamData,
) => {
  const { index, _id } = params as { index: string; _id: string }
  return [
    undefined,

    async () => {
      if (isStatusOk(res.status)) {
        const doc = await traceLog('Mongo', () =>
          mongoDb
            .collection(index)
            .findOne({ _id: new ObjectId(_id.padStart(24, '0')) }),
        )
        const resData = res.body as ElasticSearchHits<Record<string, unknown>>
        if (doc) resData._source = doc
      }
    },
  ]
}
