import Router from 'koa-router'
import { getStatsHandler } from './stats'
const router = new Router()

router.get('/stats', getStatsHandler)

router.get('/favicon.ico', (ctx) => (ctx.status = 204))

export { router }
