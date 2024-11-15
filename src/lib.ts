import { logger } from '../logger'
import { ENABLE_DB } from './constants'

import Koa from 'koa'

function isStatusOk(res: Koa.Response) {
  return Math.floor(res.status / 100) * 100 == 200
}

async function traceLog<T, K extends string>(
  type: K,
  func: () => PromiseLike<T>,
  context?: Array<string>,
): Promise<T | undefined> {
  const t0 = performance.now()
  const ignore = !ENABLE_DB && type === 'Mongo'

  if (ignore) {
    logger.warn(
      `[${type}] ${context} Operatoinal data not enabled! Pretend that the data is returned correctly.Ignore this warning message!`,
    )
    return undefined
  }

  return func().then((res) => {
    logger.info(`[${type}] ${context} ${(performance.now() - t0).toFixed(2)} ms `)
    logger.trace(JSON.stringify(res))
    return res
  })
}

function replaceKeysInBody(source: unknown, mapper?: Record<string, string>): unknown {
  if (
    source === undefined ||
    source === null ||
    mapper === undefined ||
    Object.keys(mapper).length === 0
  ) {
    return source
  }
  if (Array.isArray(source)) {
    return source.map((item) => replaceKeysInBody(item, mapper))
  }

  if (typeof source === 'string') {
    return mapper[source] || source
  }

  if (typeof source === 'object') {
    const newObject: Record<string, unknown> = {}
    const newObject1 = source as Record<string, unknown>
    for (const key in source) {
      if (key === '_source') {
        continue
      }
      const newKey = mapper[key] || key
      newObject[newKey] = replaceKeysInBody(newObject1[key] as Record<string, unknown>, mapper)
    }
    return newObject
  }
  return source
}

export { isStatusOk, replaceKeysInBody, traceLog }
