import { buildPaths, extractFields, ExtractLinkNode } from '@eslibr/lib'
import { logger } from '@eslibr/logger'

export class LiteTransformer {
  data: object | unknown
  mapper?: Array<ExtractLinkNode>
  index: string
  constructor(data: object, mapper?: Array<ExtractLinkNode>) {
    this.data = data
    this.mapper = mapper || []
    this.index = ''
  }

  makeLiteBody(): Record<string, unknown> {
    if (
      ['index', 'delete', 'create', 'update'].some((key) =>
        Object.keys(this.data || {}).includes(key),
      )
    ) {
      return this.data as Record<string, unknown>
    }
    if (!this.mapper) {
      logger.warn('not found mapper, return original data')
      return this.data as Record<string, unknown>
    }

    const targetData = extractFields(this.data, this.mapper)
    // logger.info(JSON.stringify(targetData, null, 2))
    logger.trace(
      JSON.stringify(
        this.mapper.flatMap((it) => buildPaths(it)),
        null,
        2,
      ),
    )
    // return {
    //   targetData,
    //   mapper: this.mapper.flatMap((it) => buildPaths(it)),
    // }

    return targetData
  }

  makeLiteSearch() {
    return this.data
  }
}
