import Koa from 'koa'
import { IncomingMessage } from 'node:http'
import { ParamData } from 'path-to-regexp'

import { getLinkNode, mongoDb } from '@eslibr/init'
import { isStatusOk, traceLog } from '@eslibr/lib'
import { logger } from '@eslibr/logger'
import { SearchHit } from '@elastic/elasticsearch/lib/api/types'
import { TransHandler } from '.'

export const _getHandler: TransHandler = (
  req: IncomingMessage,
  res: Koa.Response,
  params: ParamData,
) => {
  const { index, _id } = params as { index: string; _id: string }

  const linkNode = getLinkNode(index)
  if (!linkNode) {
    return [undefined, undefined]
  }

  return [
    undefined,

    async () => {
      if (!isStatusOk(res.status)) {
        logger.error(`Get status failed: ${res.status}`)
        return
      } else {
        const doc = await traceLog('Mongo', () =>
          mongoDb
            .collection<{
              _id: string
            }>(index)
            .findOne({
              _id,
            }),
        )

        const resData = res.body as SearchHit
        if (doc) resData._source = doc
      }
    },
  ]
}
