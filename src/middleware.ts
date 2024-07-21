import axios, { AxiosResponse, Method } from "axios";
import koa from "koa";
import { logger } from "../logger";
import jq from "jsonpath";
import { SearchRequest } from "@elastic/elasticsearch/lib/api/types";

const mapper:Record<string,string> = {
  "data.context.id" :"data_context_id",
  "data.context.authors" :"data_context_authors",
  "data.context.sections.uniqueName" :"data_context_sectionsuniqueName",
  "data.context.sections.uniqueName.keyword": "data_context_sections_uniqueName_keyword",
  "data.context.sections":"data_context_sections",
  "data.context.updated":"data_context_updated"
}
const source = {
	"size": 60,
	"from": 0,
	"_source": [
		"data.context.id",
		"data.context.authors",
		"data.context.sections.uniqueName"
	],
	"sort": [
		{
			"data.context.updated": "desc"
		}
	],
	"query": {
		"bool": {
			"should": {
				"nested": {
					"query": {
						"bool": {
							"should": [
								{
									"term": {
										"data.context.sections.uniqueName.keyword": "news_singapore"
									}
								}
							]
						}
					},
					"path": "data.context.sections"
				}
			}
		}
	}
}

function getValueByPath(data: unknown, path: string) {
  const paths = path.split(".");
  let result = data;
  for (const p of paths) {
    if (result === undefined || result === null || typeof result !== "object" || !( p in result)) {
      return result;
    }
    result = (result as Record<string,unknown>)[p]
  }
  return result;
}
function replaceKeysInBody(source: unknown , mapper: Record<string, string>):unknown  {
  if (source === undefined || source === null) {
    return source
  }
  if (Array.isArray(source)) {
    return source.map((item) => replaceKeysInBody(item, mapper));
  }

  if (typeof source === "string") {
    return mapper[source] || source;
  }

  if (typeof source === "object") {
    let newObject: Record<string, unknown> = {};
    const newObject1 = source as Record<string, unknown>;
    for (const key in source) {
      const newKey = mapper[key] || key;
      newObject[newKey] = replaceKeysInBody(newObject1[key] as Record<string, unknown>, mapper);
    }
    return newObject;
  }
  return source
}

export function AxiosProxy(url: string) {
  return async (ctx: koa.ExtendableContext) => {

    const isSearch = ctx.request.url .endsWith('_search') 
   
    if (isSearch){
       const k = JSON.parse(ctx.request.body) as SearchRequest
      logger.warn(replaceKeysInBody(k, mapper))
      ctx.request.body = JSON.stringify(replaceKeysInBody(k, mapper))
    }

    const axiosRes = await ExpressToAxios(url, ctx.request);

    if(isSearch){
      logger.info(getValueByPath(source,"size"))
      logger.info(getValueByPath(source,"sort"))
      logger.info(getValueByPath(source,"sort.0"))
      logger.info(getValueByPath(source,"query.bool.should.nested.query.bool.should"))
      logger.info(getValueByPath(source,"query.bool.should.nested.path"))
    }
    ctx.response.status = axiosRes.status as number;
    ctx.response.body = axiosRes.data;
    Object.entries(axiosRes.headers).forEach(([key, value]) => {
      ctx.response.set(key, value + "");
    });


  };
}

async function ExpressToAxios(url: string, request: koa.Request) {
  const reqUrl = `${url}${request.url}`;
  const urlInfo = new URL(reqUrl);
  delete request.headers["content-length"];
  delete request.headers["host"];
  const reqHeaders = {
    ...request.headers,
    ["content-type"]: urlInfo.pathname.endsWith("_bulk")
      ? "application/x-ndjson"
      : "application/json",
    host: urlInfo.hostname,
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
