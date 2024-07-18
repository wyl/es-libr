 

import axios from "axios";
import { router } from "./constants";
router.all(
  "/search",
  async (ctx, next) => {
    console.log(`router.post("/search"`);
    ctx.response.body =  {
      body: ctx.request.body,
      query: ctx.request.query,
      params: ctx.params,
      headers: ctx.headers,
      method: ctx.method,
      url: ctx.url,
    };
    // request(options, function (error, response, body) {
    //   if (error) throw new Error(error);
    
    //   console.log(body);
    // })
    
  // next()
}
);
