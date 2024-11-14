import dotenv from "dotenv";
dotenv.config();

import { logger } from "../logger";
import { SERVER_PORT } from "./constants";
import { initServer } from "./global";
import { app } from "./app";

async function run() {
  await initServer();

  app.listen(SERVER_PORT);
  logger.info(`Listening to http://localhost:${SERVER_PORT} 🚀`);
}

run();
