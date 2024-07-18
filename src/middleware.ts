import axios, { AxiosResponse, Method } from "axios";
import koa from "koa";
import { logger } from "../logger";
import ndjson from "ndjson";
import { parse } from "path";
import fs from "fs";
export function AxiosProxy(url: string) {
  return async (ctx: koa.ExtendableContext) => {
    const axiosRes = await ExpressToAxios(url, ctx.request);
    ctx.response.status = axiosRes.status as number;
    ctx.response.body = axiosRes.data;
    Object.entries(axiosRes.headers).forEach(([key, value]) => {
      ctx.response.set(key, value + "");
    });
  };
}

async function ExpressToAxios(url: string, request: koa.Request) {
  const reqUrl = `${url}${request.url}`;
  const kk = new URL(reqUrl);
  delete request.headers["content-length"];
  delete request.headers["host"];
  const reqHeaders = {
    ...request.headers,
    host: kk.hostname,
  };
  
  const options = {
    url: reqUrl,
    method: request.method as Method,
    headers: reqHeaders,
    params: request.query,
    data: request.body,
  };
  logger.debug(">>>>>>", reqUrl, JSON.stringify(options, null, 2));

  const axiosRes = axios
    .request(options)
    .then((it) => {
      // logger.debug("<<<<<<", it.data);
      return {
        status: it.status,
        headers: it.headers,
        data: it.data,
      };
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        logger.debug("<<<<<<", error.response.data);
        return {
          status: error.response.status,
          headers: error.response.headers,
          data: error.response.data,
        };
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        logger.debug(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        logger.debug("Error", error.message);
      }
      logger.debug(error.config);
      logger.debug(error.message);
      return error;
    });

  return axiosRes;
}
