import { logger } from '../../logger'
export class LiteTransformer {
  data: object | unknown
  mapper?: Record<string, string>
  index: string
  constructor(data: object, mapper?: Record<string, string>) {
    this.data = data
    this.mapper = mapper
    this.index = ''
  }

  makeLiteBody(): Record<string, unknown> {
    if (
      ['index', 'delete', 'create', 'update', 'doc'].some((key) =>
        Object.keys(this.data || {}).includes(key),
      )
    ) {
      return this.data as Record<string, unknown>
    }
    if (!this.mapper) {
      logger.warn('not found mapper, return original data')
      return this.data as Record<string, unknown>
    }

    const transData = Object.fromEntries(
      Object.entries(this.mapper).map(([k, v]) => {
        return [v, this.getValueByPath(k)]
      }),
    )
    return transData
  }

  makeLiteSearch() {
    return replaceKeysInBody(this.data, this.mapper)
  }

  protected getValueByPath(path: string): unknown {
    if (path.endsWith('.keyword')) path = path.replace('.keyword', '')

    const paths = path.split('.')

    let result = this.data
    for (let i = 0; i < paths.length; i++) {
      result = getValueByKey(result, paths[i])
      if (result === undefined) break
    }

    if (result === undefined) logger.error(`not found value by path: ${path}`)
    return result
  }
}

function getValueByKey(target: unknown, path: string): unknown {
  if (target === undefined || target === null) {
    return target
  }

  if (typeof target !== 'object') {
    return undefined
  }
  if (Array.isArray(target)) {
    const t = target
      .map((item: unknown) => getValueByKey(item, path))
      .filter(Boolean)

    if (t.every((item) => Array.isArray(item))) {
      return t.flat()
    }
    return t
  }
  if (typeof target === 'object') {
    const data = (target as Record<string, unknown>)[path]
    if (data === undefined) {
      return data
    }
    return data
  }
  return target
}

/** @private */
export function replaceKeysInBody(
  source: unknown,
  mapper?: Record<string, string>,
): unknown {
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
      newObject[newKey] = replaceKeysInBody(
        newObject1[key] as Record<string, unknown>,
        mapper,
      )
    }
    return newObject
  }
  return source
}
