import { LiteTransformer } from '@eslibr/core/lite-transformer'
import { getLinkNode, mongoDb } from '@eslibr/init'
import { IncomingMessage } from 'node:http'

import {
  Fields,
  SearchRequest,
  SearchResponse,
  SearchSourceConfig,
} from '@elastic/elasticsearch/lib/api/types'
import { isStatusOk, traceLog } from '@eslibr/lib'
import { logger } from '@eslibr/logger'
import Koa from 'koa'
import { ParamData } from 'path-to-regexp'
import { TransHandler } from '.'

export const _searchHandler: TransHandler = (
  req: IncomingMessage,
  res: Koa.Response,
  params: ParamData,
) => {
  const { target } = params as { target: string }
  let _source: SearchSourceConfig | undefined = true
  let _source_excludes: Fields | undefined = undefined
  let _source_includes: Fields | undefined = undefined
  return [
    async () =>
      new Promise<string>((resolve, reject) => {
        let body = ''
        req
          .on('data', (data) => {
            body += data.toString()
          })
          .on('end', () => {
            const reqBody = JSON.parse(body || '{}') as SearchRequest
            const linkNode = getLinkNode(target)
            _source = reqBody._source
            _source_excludes = reqBody._source_excludes
            _source_includes = reqBody._source_includes

            reqBody._source = !reqBody._source
            const trans = new LiteTransformer(reqBody, linkNode)

            resolve(JSON.stringify(trans.makeLiteSearch()))
          })
          .on('error', (err) => reject(err))
      }),

    async () => {
      if (!isStatusOk(res.status)) {
        logger.error(`Search status failed: ${res.status}`)
        return
      }

      const resData =
        (res.body as SearchResponse<Record<string, string>>).hits?.hits || []

      const ids = resData.map((it) => it._id || '')

      const documents = await traceLog(
        `Mongo`,
        () =>
          mongoDb
            .collection<{ _id: string }>(target)
            .find(
              { _id: { $in: ids } },
              {
                projection: mockMongoFields(
                  _source,
                  _source_excludes,
                  _source_includes,
                ),
              },
            )
            .toArray(),
        [target],
      )

      resData.forEach((data) => {
        const rawData = documents?.find((it) => it._id === data._id)
        if (rawData) {
          data._source = rawData
        } else {
          logger.error(`Can't find data with id: ${data._id}`)
        }
      })
    },
  ]
}

function mockMongoFields(
  source: SearchSourceConfig | undefined,
  _excludes: Fields | undefined,
  _includes: Fields | undefined,
): Record<string, number> {
  if (source === false) {
    return {}
  }
  if (source === true) {
    return {}
  }

  if (Array.isArray(source)) {
    return Object.fromEntries([
      ...[_includes].flat().map((it) => [it, 1]),
      ...[_excludes].flat().map((it) => [it, 0]),
      ...source.map((it) => [it, 1]),
    ])
  }

  if (typeof source === 'object') {
    const { excludes, exclude, include, includes } = source
    _excludes = excludes || exclude || _excludes
    _includes = includes || include || _includes
  }

  const fields = []
  if (Array.isArray(_excludes)) {
    fields.push(_excludes.map((it) => [it, 0]))
  }
  if (Array.isArray(_includes)) {
    fields.push(_includes.map((it) => [it, 1]))
  }

  return Object.fromEntries(fields)
}
