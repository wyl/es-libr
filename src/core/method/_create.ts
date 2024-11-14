import { IncomingMessage } from "node:http";

import Koa from "koa";
import { ParamData } from "path-to-regexp";
import { logger } from "../../../logger";
import { indexMapping, mongoDb } from "../../global";
import { LiteTransformer } from "../lite-transformer";
import { traceLog } from "../../lib";
import { ObjectId } from "mongodb";
import { TransHandler } from ".";
import { ElasticsearchUpdatedResponse } from "../../types";

export const _createHandler: TransHandler = (
  req: IncomingMessage,
  res: Koa.Response,
  params: ParamData
) => {
  const { index, _id } = params as { index: string; _id: string };
  let body = "";

  return [
    async () =>
      new Promise<string>((resolve, reject) => {
        const currMapping = indexMapping()[index]?.mapping();
        req
          .on("data", (data) => {
            body += data.toString();
          })
          .on("end", async () => {
            const doc = JSON.parse(body || "{}");
            const trans = new LiteTransformer(doc, currMapping);
            trans.makeLiteBody();
            resolve(JSON.stringify(trans.makeLiteBody()));
          })
          .on("error", (err) => reject(err));
      }),

    async () => {
      if ((res.body as ElasticsearchUpdatedResponse).result === "created") {
        const doc = JSON.parse(body || "{}");
        await traceLog("Mongo", () =>
          mongoDb
            .collection(index)
            .insertOne({ ...doc, _id: new ObjectId(_id.padStart(24, "0")) })
        ).then((it) => {
          logger.trace(it);
          return it;
        });
      }
    },
  ];
};
