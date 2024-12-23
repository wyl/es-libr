import dotenv from 'dotenv'
import { getIndexLinkNode } from '@eslibrRoot/index-mappings'
import { logger } from './logger'
dotenv.config()

const getLinkNode = getIndexLinkNode()

async function initServer() {
  // const imapping = indexMapping();
  // const mapping = getIndexMapper("caas-cn-zaobao-online");
  // TODO create or update Es Index

  logger.info('Server started')
}

async function stopServer() {
  logger.info('Server stopped')
}

export { initServer, stopServer, getLinkNode }
