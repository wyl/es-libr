import dotenv from 'dotenv'
dotenv.config()
import { Db } from 'mongodb'
import { ENABLE_DB, INDEX_MAPPING_FILE_PATH, MONGODB_DBNAME } from './constants'
import { IndexMappings, loadIndexMapping } from './core/index-mapping'
import { mongoClient } from './core/mongodb'

let indexMapping: () => IndexMappings
let mongoDb: Db

async function initServer() {
  indexMapping = await loadIndexMapping(INDEX_MAPPING_FILE_PATH)

  // const imapping = indexMapping();

  if (ENABLE_DB) {
    await mongoClient.connect()
    mongoDb = mongoClient.db(MONGODB_DBNAME)
  }

  // const mapping = getIndexMapper("caas-cn-zaobao-online");
  // todo create or update Es Index
}

async function stopServer() {
  mongoClient.close()
}

export { indexMapping, initServer, mongoDb, stopServer }
