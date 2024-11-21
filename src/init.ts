import {
  ENABLE_DB,
  MONGODB_DBNAME
} from '@eslibr/constants'
import { mongoClient } from '@eslibr/core/mongodb'
import dotenv from 'dotenv'
import { Db } from 'mongodb'
import * as o from '../index-mappings'
dotenv.config()



const getLinkNode = o.getIndexLinkNode()


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
