import dotenv from "dotenv";
import Koa from "koa";
// import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import { logger } from "../logger";
import { router } from "./apis/constants";
import "./implements";
import { AxiosProxy } from "./middleware";

dotenv.config();

const port = process.env.PORT || 3000;
const app = new Koa({ proxy: true });

// const esHost = `${process.env.ES_PROTOCOL}://${process.env.ES_USERNAME}:${process.env.ES_PASSWORD}@${process.env.ES_ENDPOINT}`;

const esHost = `${process.env.ES_PROTOCOL}://${process.env.ES_ENDPOINT}`;
console.log(esHost);
app.use(cors());
app.use(bodyParser())
app.use(async function (ctx,next){
  await next();
}
)
// app.use(bodyParser({ strict: false, enableTypes: undefined }));

app.use(router.routes());
app.use(AxiosProxy(esHost));

app.use((ctx) => {
  ctx.body = "who are you?";
});

// app.on("error", (err, ctx) => {
//   logger.error("server error", err, ctx);
//   //   logger.warn("server error", err, ctx);
//   logger.info(err);
// });

app.listen(port);
