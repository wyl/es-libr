import { Response } from "koa";
// import bodyParser from "koa-bodyparser";

import { randomUUID } from "crypto";
import _ from "lodash";
import { PassThrough } from "stream";
import { logger } from "../logger";
import { Context, Next } from "koa";
import HttpProxy from "http-proxy";
import { ServerResponse, OutgoingMessage } from "http";
const customProxy = HttpProxy.createProxyServer();
export function httpProxyMiddleware(esHost: string) {
  return async (ctx: Context, next: Next) => {
    const middlewareId = randomUUID();

    console.log(middlewareId, ctx.request.url);
    ctx.res.on("close", () => {
      console.log("close", middlewareId);
    });
    ctx.res.on("finish", () => {
      console.log("finish", middlewareId);
    });

    await new Promise((resolve, reject) => {
      console.log("promise", middlewareId);
      const resAdapter = makeProxyResponseAdapter(ctx.response, resolve);
      customProxy.web(ctx.req, resAdapter, {
        target: esHost,
        changeOrigin: true,
      });
    });
    console.log("end", middlewareId);
    // return next();
  };
}
function makeProxyResponseAdapter(
  response: Response,
  done: (v?: any) => void
): ServerResponse {
  const resAdapter = new OutgoingMessage() as ServerResponse;

  resAdapter.on("pipe", (proxyRes) => {
    proxyRes.unpipe(resAdapter);

    response.status = resAdapter.statusCode;
    response.message = resAdapter.statusMessage;

    for (const [headerName, headerVal] of Object.entries(
      resAdapter.getHeaders()
    )) {
      if (_.isNil(headerVal)) {
        continue;
      }
      response.set(
        headerName,
        _.isNumber(headerVal) ? _.toString(headerVal) : headerVal
      );
    }

    response.body = proxyRes.pipe(new PassThrough());

    done();
  });

  return resAdapter;
}
