 

import { koaBody } from "koa-body";
import { router } from "./constants";
router.post(
  "/search",
  koaBody(),
  (ctx, next) => {
    const k = ctx.request.body;
    console.log(`router.post("/search"`);
    ctx.body = {
      body: ctx.request.body,
      query: ctx.request.query,
      params: ctx.params,
      headers: ctx.headers,
      method: ctx.method,
      url: ctx.url,
    };
  },
  (ctx) => {}
);
