import { ExtractLinkNode, makeIndexLinkNode } from '@eslibr/lib'
import { mapping } from './caas-cn-zaobao-online'

const indexMappingList = [mapping]


function generateIndexLinkNodeMapping(): Record<string, Array<ExtractLinkNode>> {
  return Object.fromEntries(
    indexMappingList.map((mapping) =>
      [mapping.index.toString(), makeIndexLinkNode(mapping.properties)]
    )
  )
}


function getIndexLinkNode(): (index: string) => Array<ExtractLinkNode> {
  let result: Record<string, Array<ExtractLinkNode>>
  return function (_index: string) {
    if (!result) {
      result = generateIndexLinkNodeMapping()
    }
    return result[_index]
  }
}

export { getIndexLinkNode }