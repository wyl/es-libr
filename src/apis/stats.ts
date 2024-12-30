import { generateIndexLinkNodeMapping, indexMappingList } from 'index-mappings'
import { Context } from 'koa'

export function getStatsHandler(ctx: Context) {
  ctx.body = {
    index: indexMappingList,
    node: generateIndexLinkNodeMapping(),
  }
}
