import {
  ENABLE_DB,
  INDEX_MAPPING_FILE_PATH,
  MONGODB_DBNAME,
} from '@eslibr/constants'
import { IndexMappings, loadIndexMapping } from '@eslibr/core/index-mapping'
import { mongoClient } from '@eslibr/core/mongodb'
import dotenv from 'dotenv'
import { Db } from 'mongodb'
dotenv.config()

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
