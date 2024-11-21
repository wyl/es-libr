import { IncomingMessage } from 'node:http'
import { mongoDb } from '@eslibr/init'

import Koa from 'koa'
import { ObjectId } from 'mongodb'
import { ParamData } from 'path-to-regexp'
import { TransHandler } from '.'
import { isStatusOk, traceLog } from '@eslibr/lib'
import { logger } from '@eslibr/logger'
// import { logger } from 'src/logger'

export const _deleteHandler: TransHandler = (
  req: IncomingMessage,
  res: Koa.Response,
  params: ParamData,
) => {
  const { index, _id } = params as { index: string; _id: string }
  return [
    undefined,

    async () => {
      if (!isStatusOk(res.status)) {
        logger.error(`Delete status failed: ${res.status}`)
        return
      }

      await traceLog('Mongo', () =>
        mongoDb
          .collection(index)
          .deleteOne({ _id: new ObjectId(_id.padStart(24, '0')) }),
      ).then((it) => {
        logger.trace(it)
        return it
      })
    },
  ]
}
