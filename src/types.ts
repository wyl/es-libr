export type ParamType<T> = T extends (arg: infer P) => unknown ? P : T

export type ElasticsearchResponse<T> = {
  hits: {
    max_score: null | number
    hits: Array<ElasticSearchHits<T>>
  }
}

export type ElasticSearchHits<M> = {
  _index: string
  _id: string
  _versoin: number
  _seq_no: number
  _primary_term: number
  found: boolean
  _score: null | number
  _source: M
}

export type ElasticsearchUpdatedResponse = {
  _index: string
  _id: string
  _version: number
  _seq_no: number
  _primary_term: number

  result: 'deleted' | 'created' | 'updated'
  _shards: {
    total: number
    succcessful: number
    failed: number
  }
}
