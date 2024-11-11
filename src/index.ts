import dotenv from "dotenv";
dotenv.config();

import cors from "@koa/cors";
import Koa from "koa";
import { logger } from "../logger";
import { router } from "./apis/constants";
import { SERVER_PORT } from "./constants";
import { initGlobal } from "./global";
import "./implements";
import { AxiosProxy, ContextMiddleware } from "./middleware";

const app = new Koa({ proxy: true });

async function main() {
  await initGlobal();
  await runServer(SERVER_PORT);
  logger.info(`Server running on port ${SERVER_PORT}`);
}

main();

async function runServer(port: string) {
  app.use(cors());

  app.use(async function (ctx, next) {
    const start = performance.now();
    await next().then(() => {
      logger.info(
        `${ctx.request.method}\t${ctx.req.url} ${ctx.response.status}\t${(
          performance.now() - start
        ).toFixed(2)} ms`
      );
    });
  });

  app.use(router.routes());
  app.use(router.allowedMethods());
  // !! 核心 Middleware 开始
  app.use(ContextMiddleware());
  app.use(AxiosProxy());
  // !! 核心 Middleware 结束

  app.use((ctx) => {
    ctx.body = "who are you?";
  });

  app.on("error", (err, ctx) => {
    logger.error("server error", err, ctx);
    //   logger.warn("server error", err, ctx);
    logger.info(err);
  });

  app.listen(port);
}
