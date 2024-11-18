import { logger } from '@eslibr/logger'
import { AxiosProxy, ContextMiddleware } from '@eslibr/middleware'
import cors from '@koa/cors'
import Koa from 'koa'
import { router } from './apis'
import { asyncLocalStorage } from './constants'
import { randomBytes } from 'crypto'

const app = new Koa({ proxy: true })
app.use(cors())

app.use(async function (ctx, next) {
  const start = performance.now()

  const xRequestId =
    (ctx.request.headers['x-request-id'] as string) ||
    randomBytes(16).toString('hex')

  await asyncLocalStorage.run({ 'x-request-id': xRequestId }, async () => {
    return await next().then(() => {
      logger.info(
        `${ctx.request.method.padEnd(10, ' ')}${ctx.req.url} ${
          ctx.response.status
        }\t${(performance.now() - start).toFixed(2)} ms`,
      )
    })
  })
})

app.use(router.routes())
app.use(router.allowedMethods())

// !! Core Middleware Start
app.use(ContextMiddleware())
app.use(AxiosProxy())
// !! Core Middleware End

app.use((ctx) => {
  ctx.body = 'who are you?'
})

app.on('error', (err, ctx) => {
  logger.error('server error', err, ctx)
  //   logger.warn("server error", err, ctx);
  logger.info(err)
})

export { app }
