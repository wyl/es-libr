import { AsyncLocalStorage } from 'node:async_hooks'
import { TLogLevelName } from 'tslog'

const SERVER_PORT = process.env.PORT || '3000'
const ELASTICSEARCH_HOST = process.env.ES_HOST || 'http://127.0.0.1:9200'
const LOG_LEVEL: TLogLevelName | undefined =
  (process.env.LOG_LEVEL as TLogLevelName) || 'info'

interface IAsyncLocalStorage {
  'x-request-id': string
}

const asyncLocalStorage = new AsyncLocalStorage<IAsyncLocalStorage>()

export { asyncLocalStorage, ELASTICSEARCH_HOST, SERVER_PORT, LOG_LEVEL }
