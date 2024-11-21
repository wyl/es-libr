import {
  generateIndexLinkNodeMapping,
  indexMappingList,
} from '@eslibrRoot/index-mappings'
import { Context } from 'koa'

export function getStatsHandler(ctx: Context) {
  ctx.body = {
    index: indexMappingList,
    node: generateIndexLinkNodeMapping(),
  }
}
