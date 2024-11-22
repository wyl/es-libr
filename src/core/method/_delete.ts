import { mongoDb } from '@eslibr/init'
import { IncomingMessage } from 'node:http'

import { isStatusOk, traceLog } from '@eslibr/lib'
import { logger } from '@eslibr/logger'
import Koa from 'koa'
import { ParamData } from 'path-to-regexp'
import { TransHandler } from '.'
// import { logger } from 'src/logger'

export const _deleteHandler: TransHandler = (
  req: IncomingMessage,
  res: Koa.Response,
  params: ParamData,
) => {
  const { index, _id } = params as {
    index: string
    _id: string
  }
  return [
    undefined,

    async () => {
      if (!isStatusOk(res.status)) {
        logger.error(`Delete status failed: ${res.status}`)
        return
      }

      await traceLog('Mongo', () =>
        mongoDb.collection<{ _id: string }>(index).deleteOne({ _id: _id }),
      ).then((it) => {
        logger.trace(it)
        return it
      })
    },
  ]
}
