export type ParamType<T> = T extends (arg: infer P) => any ? P : T;

export type ElasticsearchResponse<T> = {
  hits: {
    max_score: null | number;
    hits: Array<ElasticSearchHits<T>>;
  };
};

export type ElasticSearchHits<M> = {
  _index: string;
  _id: string;
  _score: null | number;
  _source: Array<M>;
};
