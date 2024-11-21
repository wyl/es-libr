import * as T from '@elastic/elasticsearch/lib/api/types'
import { ENABLE_DB } from '@eslibr/constants'
import { logger } from '@eslibr/logger'

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
      `[${type}] ${context || ''
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

export type ExtractLinkNode<> = {
  key: string
  next?: Array<ExtractLinkNode>
}

type MappingProperties = T.IndicesPutMappingRequest['properties']

function makeIndexLinkNode(mapping: MappingProperties): Array<ExtractLinkNode> {
  return Object.entries(mapping || {}).map(([key, value]) => ({
    key,
    next: 'properties' in value ? makeIndexLinkNode(value.properties || {}) : undefined
  }))
}


type Optional<T> = {
  [K in keyof T]?: T[K]
};

type MaybeOptional<T> = Optional<T> | Array<Optional<T>>

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
function extractFieldsWithNode<T extends unknown, U extends keyof T>(obj: T, node: ExtractLinkNode): [U, MaybeOptional<T>] {
  const { key, next } = node
  let value = obj[key as keyof T] as MaybeOptional<T>
  if (next) {
    if (Array.isArray(value)) {
      value = value.map(item => extractFields(item, next || []))
    } else {
      value = extractFields<typeof value>(value, next || [])
    }
  }
  return [key as U, value]
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
function extractFields<T extends unknown>(obj: T, cfg: Array<ExtractLinkNode>): Optional<T> {
  const tmpData = cfg.map(it => extractFieldsWithNode(obj, it))
  return Object.fromEntries(tmpData) as Optional<T>
}


export { extractFields, isStatusOk, makeIndexLinkNode, traceLog }

