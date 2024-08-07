import dotenv from "dotenv";
import Koa from "koa";
import cors from "@koa/cors";
import { logger } from "../logger";
import { router } from "./apis/constants";
import "./implements";
import { AxiosProxy } from "./middleware";
import {
  ELASTICSEARCH_HOST,
  INDEX_MAPPING_FILE_PATH,
  SERVER_PORT,
} from "./constants";
import { loadIndexMapping } from "./init/init-index-mapping";
import { initGlobal } from "./global";
dotenv.config();

const app = new Koa({ proxy: true });

async function main() {
  
  await initGlobal();
  await runServer(SERVER_PORT, ELASTICSEARCH_HOST);
  logger.info(`Server running on port ${SERVER_PORT}`);
}
main();

async function runServer(port: string, esHost: string) {
  app.use(cors());
  app.use(async function (ctx, next) {
    const body = await new Promise<string>((resolve, reject) => {
      let body = "";
      ctx.req.on("data", (chunk) => (body += chunk));
      ctx.req.on("end", () => resolve(body));
      ctx.req.on("error", (err) => reject(err));
    });
    ctx.request.body = body;

    await next();
  });
  // app.use(function* (ctx, next) {
  //   ctx.text = yield getRawBody(ctx.req, {
  //     length: ctx.req.headers["content-length"],
  //     limit: "1mb",
  //     encoding: contentType.parse(ctx.req).parameters.charset,
  //   });
  //   yield next;
  // });

  app.use(async function (ctx, next) {
    const start = Date.now();
    await next().then((result) => {
      logger.info(
        `${ctx.request.method}\t${ctx.req.url} ${ctx.response.status}\t${
          Date.now() - start
        } ms`
      );
      return result;
    });
  });
  // app.use(bodyParser({ strict: false, enableTypes: undefined }));

  app.use(router.routes());
  app.use(router.allowedMethods());
  app.use(AxiosProxy(esHost));

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
