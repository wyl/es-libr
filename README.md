# Overview

像使用 Es 一样去使用，不需要更改查询语法，不会更改数据返回值，提高 ES 查询效率。

为什么要使用

像使用 ES 一样去使用这个服务，不更改之前的语法，不更改数据返回值。但对 ES 的使用将更加高效。

![KOA Onion Model](image/image-20241112-080341.png)

## Features

- [x] 数据结构已打平，需要打平 nested 数据结构
- [ ] ES /\_reindex 的功能需要考虑如何实现
- [ ] ~~aggregate 语法的支持~~
- [ ] 支持更多的语法
- [ ] Search \_source include /exclude 支持
- [x] 一些对 Mongo 操作的语法，需要依赖 ES 返回状态。

https://stackoverflow.com/questions/50907005/elasticsearch-fast-query-but-slow-response-time-when-retrieving-source-even-if

https://www.elastic.co/guide/en/elasticsearch/guide/current/nested-objects.html
