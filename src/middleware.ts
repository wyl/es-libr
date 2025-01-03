import { ELASTICSEARCH_HOST } from '@eslibr/constants'
import { getHandlerInvoker } from '@eslibr/core/method'
import { traceLog } from '@eslibr/lib'
import { logger } from '@eslibr/logger'
import axios, { Method } from 'axios'
import { IncomingMessage } from 'http'
import https from 'https'
import koa from 'koa'

function defaultReceiveBody(req: IncomingMessage) {
  return () =>
    new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const chunks: any = []
      req
        .on('data', (data) => {
          chunks.push(data)
        })
        .on('end', () => {
          if (chunks.length > 0) {
            resolve(Buffer.concat(chunks).toString())
          }
          resolve(undefined)
        })
        .on('error', (err) => reject(err))
    })
}

function ContextMiddleware() {
  return async function (ctx: koa.Context, next: koa.Next) {
    const invokerSettings = getHandlerInvoker(
      ctx.req.url || '',
      ctx.req.method || '',
    )

    logger.debug(
      `Ctx Middleware: ${ctx.req.url} => ${JSON.stringify(
        invokerSettings?.params.params,
      )}`,
    )

    // 如果未配置路径，仍要接收 Body 信息，向下传递。
    if (!invokerSettings) {
      ctx.request.body = await defaultReceiveBody(ctx.req)()
      return next()
    }

    const [request, response] = invokerSettings.handler(
      ctx.req,
      ctx.response,
      invokerSettings?.params.params,
    )
    // 如果配置了路径需要处理，但未配置索引，需要接收 Body 信息，向下传递。
    const doRequest = request ?? defaultReceiveBody(ctx.req)

    if (doRequest) {
      ctx.request.body = await traceLog(
        `${invokerSettings.title} >`,
        doRequest,
        [`apply request()`],
      )
    }

    // ctx.response.body = ctx.request.body
    if (!response) return next()

    await next()
    await traceLog(`${invokerSettings.title} <`, response, [`apply response()`])
  }
}

function AxiosProxy() {
  const [esHost] = [ELASTICSEARCH_HOST]

  return async (ctx: koa.ExtendableContext) => {
    const axiosRes = await traceLog(
      'Call Elasticsearch',
      () => ExpressToAxios({ url: esHost }, ctx.request),
      [ctx.request.url],
    )

    if (axiosRes instanceof Error) {
      ctx.response.status = 500
      return (ctx.response.body = axiosRes.message)
    }

    ctx.response.status = axiosRes.status
    ctx.response.body = axiosRes.data
    Object.entries(axiosRes?.headers).forEach(([key, value]) => {
      ctx.response.set(key, value + '')
    })

    return axiosRes
  }
}

const _axios = axios.create()
_axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false })
async function ExpressToAxios(param: { url: string }, request: koa.Request) {
  const reqUrl = `${param.url}${request.url}`
  const urlInfo = new URL(reqUrl)
  delete request.headers['content-length']
  delete request.headers['host']
  const reqHeaders = {
    ...request.headers,
    ['content-type']: urlInfo.pathname.endsWith('_bulk')
      ? 'application/x-ndjson'
      : 'application/json',
    host: urlInfo.hostname,
  }

  const options = {
    url: reqUrl,
    method: request.method as Method,
    headers: reqHeaders,
    params: request.query,
    data: request.body,
  }
  logger.debug('>>>>>>', reqUrl, JSON.stringify(options, null, 2))
  const axiosRes = _axios
    .request(options)
    .then((it) => {
      return {
        status: it.status,
        headers: it.headers,
        data: it.data,
      }
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        logger.trace('<<<<<<', error.response.data)
        return {
          status: error.response.status,
          headers: error.response.headers,
          data: error.response.data,
        }
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        // logger.debug(error.request)
        logger.error('Error', error.message)
      } else {
        // Something happened in setting up the request that triggered an Error
        logger.error('Error', error.message)
      }
      return error
    })
  // .then((it) => {
  //   logger.debug("<<<<<<", it);
  //   return it;
  // });
  // axiosRes.data.on("data", (chunk: string) => {
  //   console.log(chunk.toString());
  // });
  return axiosRes
}

export { AxiosProxy, ContextMiddleware }
