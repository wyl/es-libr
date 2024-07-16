 

import { router } from "./constants";
router.all(
  "/search",
  (ctx, next) => {
    console.log(`router.post("/search"`);
    ctx.response.body =  {
      body: ctx.request.body,
      query: ctx.request.query,
      params: ctx.params,
      headers: ctx.headers,
      method: ctx.method,
      url: ctx.url,
    };
  // next()
}
);
