import Koa from 'koa'
import { ObjectId } from 'mongodb'
import { IncomingMessage } from 'node:http'
import { ParamData } from 'path-to-regexp'

import { mongoDb } from '@eslibr/global'
import { isStatusOk, traceLog } from '@eslibr/lib'
import { logger } from '@eslibr/logger'
import { ElasticSearchHits } from '@eslibr/types'
import { TransHandler } from '.'

export const _getHandler: TransHandler = (
  req: IncomingMessage,
  res: Koa.Response,
  params: ParamData,
) => {
  const { index, _id } = params as { index: string; _id: string }
  return [
    undefined,

    async () => {
      if (!isStatusOk(res.status)) {
        logger.error(`Get status failed: ${res.status}`)
        return
      }
      const doc = await traceLog('Mongo', () =>
        mongoDb
          .collection(index)
          .findOne({ _id: new ObjectId(_id.padStart(24, '0')) }),
      )
      const resData = res.body as ElasticSearchHits<Record<string, unknown>>
      if (doc) resData._source = doc
    },
  ]
}
