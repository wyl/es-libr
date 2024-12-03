# Elasticsearch

Elasticsearch 是一个基于 Apache Lucene(TM) 的开源搜索引擎。一个请求的耗时分为两部分，Query Phase and Fetch Phase，即一个请求的时长 = Query + Fetch。通常情况下 Query Phase 不会成为瓶颈，Fetch Phase 会成为瓶颈。

[Elasticsearch’s Distributed Search: Query and Fetch Phases](https://medium.com/@musabdogan/elasticsearchs-distributed-search-query-and-fetch-phases-df869d35f4b3#:~:text=In%20the%20query%20phase%2C%20the,delivery%20of%20desired%20search%20outcomes.)

[Distributed Search Execution](https://www.elastic.co/guide/en/elasticsearch/guide/current/distributed-search.html)

ES 作为搜索引擎，搜索引擎内的数据结构一定要比原始数据结构小，毕竟初衷是 “使用 ES 快速相应搜索结果”。

## ES 内的数据结构：

- 仅满足搜索条件的数据结构
- 除搜索需求之外，简单的附加属性
- 除搜索需求之外，附加一些业务展示需求的属性
- 原始数据结构

根据使用场景定位搜索服务，尽量减少 ES 内的数据结构。在索引检索、文档存储、网络传输方面，减少 ES 消耗，可以提升一些效率。

## Search API

**Request**

> \_source
> (Optional) Indicates which source fields are returned for matching documents. These fields are returned in the hits.\_source property of the search response. Defaults to true. See source filtering.
>
> true
>
> (Boolean) The entire document source is returned.
>
> false
>
> (Boolean) The document source is not returned.
>
> <string>
>
> (string) Comma-separated list of source fields to return. Wildcard (\*) patterns are supported.

当请求 `_search` 时，`_source` 设置为 `false`，ES 只会经过 Query Phase，跳过 Fetch Phase 效率比较高且更稳定一般在 130ms 以内。此时 response 中含返回结果的一组 ID，可在其他系统上进行查询返回原始数据。Fetch Phase 效率较低。

[`/<index>/_search?perference=<session_id>`](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-search.html#search-search-api-path-params)

使用 ES 做分页时，由于 sorted 的属性值可能出现相同数据的情况，下一页的数据和上一页的数据有重合的情况。因为 ES 是个分布式搜索引擎，两次请求漂移到不同的节点，在发送请求时带上 Session ID，多次请求会命中在同一节点。`perference=<session_id>`

![_source:true](./image/search-with-_source-true.png)

![_source:false](./image/search-with-_source-false.png)

不设置 \_source 或将 \_source 设置为 true 时，response duration 耗时 2 左右，偶尔 response duration 会达到 10s，受 ES 当时状态影响较大。

将 \_source 设置为 false 时，response duratoin 在 200ms 左右，时长较稳定。

将 \_source 返回部分属性 `_source: ["data.context.id"] ` 效果也还行，但会经过 Fetch Phase 阶段，效率有一定影响。

**Response**

> took [Search API ](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-search.html)
>
> (integer) Milliseconds it took Elasticsearch to execute the request.
>
> This value is calculated by measuring the time elapsed between receipt of a request on the coordinating node and the time at which the coordinating node is ready to send the response.
>
> Took time includes:
>
> - Communication time between the coordinating node and data nodes
> - Time the request spends in the search thread pool, queued for execution
> - Actual execution time
>
> Took time does not include:
>
> - Time needed to send the request to Elasticsearch
> - Time needed to serialize the JSON response
> - Time needed to send the response to a client

通常一个 search 的 Response took 值非常小，took 不包含 Fetch Phase。Query Phase 通常不会成为问题。

## Nested [Nested Objects](https://www.elastic.co/guide/en/elasticsearch/guide/current/nested-objects.html)

> PUT /my_index/blogpost/1

```
{
  "title": "Nest eggs",
  "body":  "Making your money work...",
  "tags":  [ "cash", "shares" ],
  "comments": [
    {
      "name":    "John Smith",
      "comment": "Great article",
      "age":     28,
      "stars":   4,
      "date":    "2014-09-01"
    },
    {
      "name":    "Alice White",
      "comment": "More like this please",
      "age":     31,
      "stars":   5,
      "date":    "2014-10-22"
    }
  ]
}
```

> The reason for this cross-object matching, as discussed in Arrays of Inner Objects, is that our beautifully structured JSON document is flattened into a simple key-value format in the index that looks like this:

```
{
  "title":            [ eggs, nest ],
  "body":             [ making, money, work, your ],
  "tags":             [ cash, shares ],
  "comments.name":    [ alice, john, smith, white ],
  "comments.comment": [ article, great, like, more, please, this ],
  "comments.age":     [ 28, 31 ],
  "comments.stars":   [ 4, 5 ],
  "comments.date":    [ 2014-09-01, 2014-10-22 ]
}
```

指定索引是 Nested 类型，会生成多个层级的 simple-key 对象。

> The correlation between Alice and 31, or between John and 2014-09-01, has been irretrievably lost. While fields of type object (see Multilevel Objects) are useful for storing a single object, they are useless, from a search point of view, for storing an array of objects.
>
> This is the problem that nested objects are designed to solve. By mapping the comments field as type nested instead of type object, each nested object is indexed as a hidden separate document, something like this:

```
{
  "comments.name":    [ john, smith ],
  "comments.comment": [ article, great ],
  "comments.age":     [ 28 ],
  "comments.stars":   [ 4 ],
  "comments.date":    [ 2014-09-01 ]
}
{
  "comments.name":    [ alice, white ],
  "comments.comment": [ like, more, please, this ],
  "comments.age":     [ 31 ],
  "comments.stars":   [ 5 ],
  "comments.date":    [ 2014-10-22 ]
}
{
  "title":            [ eggs, nest ],
  "body":             [ making, money, work, your ],
  "tags":             [ cash, shares ]
}
```

当我们有需求如上：在查询 Comments 时同时满足，age & name 的需求。则开启 nested 结构。

**Nested Query**

```
{
    "bool": {
        "must": [
            {
                "nested": {
                    "query": [
                        {
                            "match": {
                                "comments.name": "alice"
                            }
                        },
                        {
                            "term": {
                                "comments.age": 31
                            }
                        }
                    ],
                    "path": "comments"
                }
            }
        ]
    }
}
```
