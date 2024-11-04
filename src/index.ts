import dotenv from "dotenv";
dotenv.config();

import cors from "@koa/cors";
import Koa from "koa";
import { logger } from "../logger";
import { router } from "./apis/constants";
import { SERVER_PORT } from "./constants";
import { CUSTOM_TRANS_MAPPER } from "./core/method";
import { initGlobal } from "./global";
import "./implements";
import { AxiosProxy } from "./middleware";

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
    let isSearch = false;
    let body = "";
    const pathName = ctx.req.url?.split("?").at(0) || "";
    const esMethod = pathName.split("/").at(-1) || "";

    const { request, response } = CUSTOM_TRANS_MAPPER[esMethod];
    if (!!request) body = await request(ctx.req);

    logger.info(`${ctx.req.url} ===> ${esMethod} \n${body}`);

    if (!!body) {
      ctx.request.body = body;
    }

    if (!response) return next();

    await next();
    await response(ctx.req, ctx.response);
    return;
  });

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
  app.use(AxiosProxy());

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
