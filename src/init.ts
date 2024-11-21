import { ENABLE_DB, MONGODB_DBNAME } from '@eslibr/constants'
import { mongoClient } from '@eslibr/core/mongodb'
import dotenv from 'dotenv'
import { getIndexLinkNode } from '@eslibrRoot/index-mappings'
import { Db } from 'mongodb'
dotenv.config()

const getLinkNode = getIndexLinkNode()

let mongoDb: Db

async function initServer() {
  // const imapping = indexMapping();

  if (ENABLE_DB) {
    await mongoClient.connect()
    mongoDb = mongoClient.db(MONGODB_DBNAME)
  }

  // const mapping = getIndexMapper("caas-cn-zaobao-online");
  // TODO create or update Es Index
}

async function stopServer() {
  mongoClient.close()
}

export { initServer, mongoDb, stopServer, getLinkNode }
