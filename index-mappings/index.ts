import { ExtractLinkNode, makeIndexLinkNode } from '@eslibr/lib'
import zbOnlineMapping from './caas-cn-zaobao-online'
import { logger } from '@eslibr/logger'
import postBlogMapping from './blog-post'

const indexMappingList = [zbOnlineMapping, postBlogMapping]

function generateIndexLinkNodeMapping(): Record<
  string,
  Array<ExtractLinkNode>
> {
  return Object.fromEntries(
    indexMappingList.map((mapping) => [
      mapping.index.toString(),
      makeIndexLinkNode(mapping.properties),
    ]),
  )
}

function getIndexLinkNode(): (
  index: string,
) => Array<ExtractLinkNode> | undefined {
  let result: Record<string, Array<ExtractLinkNode>>
  return function (_index: string) {
    if (!result) {
      result = generateIndexLinkNodeMapping()
    }
    const node = result[_index]
    if (node === undefined) {
      logger.warn(`Can't find index node: ${_index}`)
    }
    return node
  }
}

export { getIndexLinkNode, generateIndexLinkNodeMapping, indexMappingList }
