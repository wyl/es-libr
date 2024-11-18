import dotenv from 'dotenv'
dotenv.config()

import { app } from '@eslibr/app'
import { SERVER_PORT } from '@eslibr/constants'
import { initServer } from '@eslibr/global'
import { logger } from '@eslibr/logger'

async function run() {
  await initServer()

  app.listen(SERVER_PORT)
  logger.info(`Listening to http://localhost:${SERVER_PORT} 🚀`)
}

run()
