import Koa from 'koa'
import { IncomingMessage } from 'node:http'
import { ParamData } from 'path-to-regexp'
import { TransHandler } from '.'
import { logger } from '../../../logger'

export const _emptyHandler: TransHandler = (
  req: IncomingMessage,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  res: Koa.Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  params: ParamData,
) => {
  logger.warn(`unsupport this router， ${req.url}`)
  return [undefined, undefined]
}
