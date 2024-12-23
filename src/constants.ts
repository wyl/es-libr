import { AsyncLocalStorage } from 'node:async_hooks'

const SERVER_PORT = process.env.PORT || '3000'
const ELASTICSEARCH_HOST = `${process.env.ES_HOST}`

interface IAsyncLocalStorage {
  'x-request-id': string
}

const asyncLocalStorage = new AsyncLocalStorage<IAsyncLocalStorage>()

export { asyncLocalStorage, ELASTICSEARCH_HOST, SERVER_PORT }
