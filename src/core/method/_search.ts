import { IncomingMessage, OutgoingMessage, ServerResponse } from "node:http";
import { indexMapping } from "../../global";
import { LiteTransform } from "../lite-transform";
import { ElasticsearchResponse } from "../../types";

import Koa from "koa";
import { getMemory } from "../memory";
export async function _searchParams(req: IncomingMessage) {
  const indexName = req.url?.split("/").filter(Boolean).at(0) || "";

  return new Promise<string>((resolve, reject) => {
    let body = "";
    const currMapping = indexMapping()[indexName].mapping();
    req
      .on("data", (data) => {
        body += data.toString();
      })
      .on("end", () => {
        const trans = new LiteTransform(JSON.parse(body || "{}"), currMapping);
        resolve(JSON.stringify(trans.makeLiteSearch()));
      })
      .on("error", (err) => reject(err));
  });
}

export async function _searchResponse(req: IncomingMessage, res: Koa.Response) {
  const resData =
    (res.body as ElasticsearchResponse<Record<string, string>>).hits?.hits ||
    [];
  const promiseList = resData.map(async (data) => {
    const originData = await getMemory(data._id);
    data._source = originData;
  });

  Promise.all(promiseList);
}
