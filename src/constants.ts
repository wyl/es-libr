import { AsyncLocalStorage } from 'node:async_hooks'

const INDEX_MAPPING_FILE_PATH = './index-mapping.json'
const SERVER_PORT = process.env.PORT || '3000'
const ELASTICSEARCH_HOST = `${process.env.ES_HOST}`
const ELASTICSEARCH_API_KEY = `${process.env.ES_API_KEY}`

const MONGODB_URL = `${process.env.MONGODB_URL}` || 'mongodb://localhost:27017'
const ENABLE_DB = process.env.MONGO_ENABLE === 'TRUE'
const MONGODB_DBNAME = process.env.MONGODB_DBNAME || 'eslib'

const JEST_TEST_INDEX_NAME = 'caas-cn-zaobao-online'

interface IAsyncLocalStorage {
  'x-request-id': string
}

const asyncLocalStorage = new AsyncLocalStorage<IAsyncLocalStorage>()

export {
  ELASTICSEARCH_API_KEY,
  ELASTICSEARCH_HOST,
  ENABLE_DB,
  INDEX_MAPPING_FILE_PATH,
  JEST_TEST_INDEX_NAME,
  MONGODB_DBNAME,
  MONGODB_URL,
  SERVER_PORT,
  asyncLocalStorage,
}
