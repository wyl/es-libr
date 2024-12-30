import dotenv from 'dotenv'
import { logger } from './logger'
import { getIndexLinkNode } from 'index-mappings'
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
