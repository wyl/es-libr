import dotenv from "dotenv";
import Koa from "koa";
// import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import { logger } from "../logger";
import { router } from "./apis/constants";
import "./implements";
import { AxiosProxy } from "./middleware";
import { httpProxyMiddleware } from "./httpproxy-middleware";
dotenv.config();

const port = process.env.PORT || 3000;
const app = new Koa({ proxy: true });

const esHost = `${process.env.ES_PROTOCOL}://${process.env.ES_USERNAME}:${process.env.ES_PASSWORD}@${process.env.ES_ENDPOINT}`;
console.log(esHost);
app.use(cors());
// app.use(bodyParser({ strict: false, enableTypes: undefined }));

app.use(AxiosProxy(esHost));
// app.use(httpProxyMiddleware(esHost));

app.use(async (ctx, next) => {
  console.log(ctx.request.url);
  // console.log(ctx.req.rawBody);
  console.log(ctx.request.body);
  await next();
  console.log(ctx.response.body);
});
app.use(router.routes());
app.use((ctx) => {
  ctx.body = "who are you?";
});

app.on("error", (err, ctx) => {
  logger.error("server error", err, ctx);
  //   logger.warn("server error", err, ctx);
  logger.info(err);
});

app.listen(port);
