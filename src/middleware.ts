import axios, { Method } from "axios";
import https from "https";
import koa from "koa";
import { logger } from "../logger";
import { ELASTICSEARCH_API_KEY, ELASTICSEARCH_HOST } from "./constants";

export function AxiosProxy() {
  const esHost = ELASTICSEARCH_HOST;
  const esApiKey = ELASTICSEARCH_API_KEY;

  return async (ctx: koa.ExtendableContext) => {
    const axiosRes = await ExpressToAxios(
      { url: esHost, apiKey: esApiKey },
      ctx.request
    );

    ctx.response.status = axiosRes.status as number;
    ctx.response.body = axiosRes.data;
    Object.entries(axiosRes.headers).forEach(([key, value]) => {
      ctx.response.set(key, value + "");
    });

    return axiosRes;
  };
}

const _axios = axios.create();
_axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false });
async function ExpressToAxios(
  param: { url: string; apiKey: string },
  request: koa.Request
) {
  const reqUrl = `${param.url}${request.url}`;
  const urlInfo = new URL(reqUrl);
  delete request.headers["content-length"];
  delete request.headers["host"];
  const reqHeaders = {
    ...request.headers,
    ["content-type"]: urlInfo.pathname.endsWith("_bulk")
      ? "application/x-ndjson"
      : "application/json",
    host: urlInfo.hostname,
    Authorization: `ApiKey ${param.apiKey}`,
  };

  const options = {
    url: reqUrl,
    method: request.method as Method,
    headers: reqHeaders,
    params: request.query,
    data: request.body,
  };
  logger.debug(">>>>>>", reqUrl, JSON.stringify({ ...options }, null, 2));

  const axiosRes = _axios
    .request(options)
    .then((it) => {
      // logger.trace("<<<<<<", it.data);
      // it.data.pipe(process.stdout);
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
        logger.trace("<<<<<<", error.response.data);
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
  // axiosRes.data.on("data", (chunk: string) => {
  //   console.log(chunk.toString());
  // });
  return axiosRes;
}
