import { logger } from '@eslibr/logger'
import { ENABLE_DB } from '@eslibr/constants'

function isStatusOk(status: number) {
  return Math.floor(status / 100) * 100 == 200
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
      `[${type}] ${
        context || ''
      } Operatoinal data not enabled! Pretend that the data is returned correctly.Ignore this warning message!`,
    )
    return undefined
  }

  return func().then((res) => {
    logger.info(
      `[${type}] ${context} ${(performance.now() - t0).toFixed(2)} ms `,
    )
    logger.trace(JSON.stringify(res))
    return res
  })
}

export { isStatusOk, traceLog }
