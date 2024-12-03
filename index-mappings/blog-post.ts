import * as T from '@elastic/elasticsearch/lib/api/types'

const blogPostIndexMapping: T.IndicesPutMappingRequest = {
  index: 'my_index',
  properties: {
    title: { type: 'text' },
    // body: {type: 'text'},
    tags: { type: 'keyword' },
    comments: {
      type: 'nested',
      properties: {
        // name: {type: 'keyword'},
        age: { type: 'integer' },
        stars: { type: 'integer' },
        // date: {type: 'date'},
      },
    },
    // address: {type: 'keyword'},
  },
}

export default blogPostIndexMapping
