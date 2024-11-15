import { logger } from '../../logger'
import { replaceKeysInBody } from '../lib'

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
    const paths = path.split('.').filter((p) => p !== 'keyword')
    let result = this.data
    let targetData = undefined
    for (let i = 0; i < paths.length; i++) {
      result = getValueByKey(result, paths[i])
      if (result === undefined) break
      // console.log(i, paths.length, result);
      if (i === paths.length - 1) {
        targetData = result as string
      }
    }
    return targetData
  }
}

function getValueByKey(source: unknown, path: string | undefined): unknown {
  if (source === undefined || source === null || path === undefined) {
    return source
  }
  if (Array.isArray(source)) {
    const t = source
      .map((item: unknown) => getValueByKey(item, path))
      .filter(Boolean)

    if (t.every((item) => Array.isArray(item))) {
      return t.flat()
    }
    return t
  }
  if (typeof source === 'object') {
    return (source as Record<string, unknown>)[path]
  }
  return source
}
