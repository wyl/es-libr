import { IncomingMessage } from "node:http";

import Koa from "koa";
import { ParamData } from "path-to-regexp";
import { logger } from "../../../logger";
import { indexMapping, mongoDb } from "../../global";
import { LiteTransform } from "../lite-transform";
import { traceLog } from "../../lib";
import { ObjectId } from "mongodb";
import { TransHandler } from ".";

export const _updateHandler: TransHandler = (
  req: IncomingMessage,
  res: Koa.Response,
  params: ParamData
) => {
  const { index, _id } = params as { index: string; _id: string };

  return [
    async () =>
      new Promise<object>((resolve, reject) => {
        let body = "";
        const currMapping = indexMapping()[index].mapping();
        req
          .on("data", (data) => {
            body += data.toString();
          })
          .on("end", async () => {
            const { doc, ...otherFields } = JSON.parse(body || "{}");
            const trans = new LiteTransform(doc, currMapping);

            const updateIns = await traceLog("Mongo", () =>
              mongoDb
                .collection(index)
                .updateOne(
                  { _id: { $eq: new ObjectId(_id.padStart(24, "0")) } },
                  { $set: doc },
                  { upsert: true }
                )
            );

            logger.debug(updateIns);
            resolve({ doc: trans.makeLiteBody(), ...otherFields });
          })
          .on("error", (err) => reject(err));
      }),

    async () => {},
  ];
};
