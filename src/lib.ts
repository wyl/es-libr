import * as T from '@elastic/elasticsearch/lib/api/types'
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

  return func().then((res) => {
    logger.info(
      `[${type}] ${context || ''} ${(performance.now() - t0).toFixed(2)} ms `,
    )
    logger.trace(JSON.stringify(res))
    return res
  })
}

export type ExtractLinkNode<> = {
  key: string
  next?: Array<ExtractLinkNode>
}

export function buildPaths(
  node: ExtractLinkNode,
  parentPath: string = '',
): string[] {
  const currentPath = parentPath ? `${parentPath}.${node.key}` : node.key
  let paths: string[] = []
  if (node.next) {
    node.next.forEach((child) => {
      paths = paths.concat(buildPaths(child, currentPath))
    })
  } else {
    paths.push(currentPath)
  }
  return paths
}
type MappingProperties = T.IndicesPutMappingRequest['properties']

function makeIndexLinkNode(mapping: MappingProperties): Array<ExtractLinkNode> {
  return Object.entries(mapping || {}).map(([key, value]) => ({
    key,
    next:
      'properties' in value
        ? makeIndexLinkNode(value.properties || {})
        : undefined,
  }))
}

type Optional<T> = {
  [K in keyof T]?: T[K]
}

type MaybeOptional<T> = Optional<T> | Array<Optional<T>>

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
function extractFieldsWithNode<T extends unknown, U extends keyof T>(
  obj: T,
  node: ExtractLinkNode,
): [U, MaybeOptional<T>] {
  const { key, next } = node
  // console.log({ obj, key, P: JSON.stringify(node) })
  if (
    obj === undefined ||
    obj === null ||
    !Object.keys(obj || {}).includes(key)
  )
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return [undefined, undefined] as any

  let value = obj[key as keyof T] as MaybeOptional<T>
  if (next) {
    if (Array.isArray(value)) {
      value = value.map((item) => extractFields(item, next || []))
    } else {
      value = extractFields<typeof value>(value, next || [])
    }
  }
  return [key as U, value]
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
function extractFields<T extends unknown>(
  obj: T,
  cfg: Array<ExtractLinkNode>,
): Optional<T> {
  const tmpData = cfg.map((it) => extractFieldsWithNode(obj, it))
  return Object.fromEntries(tmpData) as Optional<T>
}

export { extractFields, isStatusOk, makeIndexLinkNode, traceLog }
