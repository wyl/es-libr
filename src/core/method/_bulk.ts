import { IncomingMessage } from "node:http";
import streamEach from "stream-each";
import through2 from "through2";

import Koa from "koa";
import { ObjectId, WithId } from "mongodb";
import ndjson from "ndjson";
import { ParamData } from "path-to-regexp";
import { TransHandler } from ".";
import { logger } from "../../../logger";
import { indexMapping, mongoDb } from "../../global";
import { isStatusOk, traceLog } from "../../lib";
import { LiteTransformer } from "../lite-transformer";

export const _bulkHandler: TransHandler = (
  req: IncomingMessage,
  res: Koa.Response,
  params: ParamData
) => {
  const { target } = params as { target: string | undefined };
  const _tmpData = createTempData();
  let currDatas: Record<string, Array<BulkData>> = {};
  let _index: string = target || "";

  return [
    async () => {
      let [_id, _type] = ["", ""];
      const lines = through2.obj();

      return new Promise<string>((resolve, reject) => {
        let body = "";

        streamEach(
          req.pipe(ndjson.parse()),
          (data, next) => {
            let ndObj = data as Object;
            const dataKeys = Object.keys(ndObj || {});

            if (
              ["index", "delete", "create", "update"].some((key) =>
                dataKeys.includes(key)
              )
            ) {
              _type = dataKeys.at(0) || "";
              _id = Object.values(ndObj).at(0)["_id"];
              _index = Object.values(ndObj).at(0)["_index"] || _index;
            } else {
              currDatas = _tmpData(_index, {
                action: _type as Option,
                document: {
                  ...ndObj,
                  _id: new ObjectId(_id.padStart(24, "0")),
                },
              });
            }

            // todo {doc: xxx} 需要处理 2024/11/14
            // if (dataKeys.length === 1 && dataKeys.at(0) === "doc") {
            //   ndObj = ndObj["doc"] as Object;
            // }

            const mapping = indexMapping()[_index]?.mapping();
            const trans = new LiteTransformer(ndObj, mapping);

            lines.write(trans.makeLiteBody());
            next();
          },
          (err) => {
            if (err) {
              console.log("error", err);
            }
            lines.end();
          }
        );

        lines
          .pipe(ndjson.stringify())
          .on("data", (data) => (body += data))
          .on("end", () => {
            resolve(body);
          })
          .on("error", (err) => reject(err));
      });
    },

    async () => {
      if (isStatusOk(res)) {
        await Promise.all(
          Object.entries(currDatas).map(([collectionKey, bulkDocuments]) => {
            const writeBulk = bulkDocuments.map((doc) => {
              const { action, document } = doc;
              switch (action) {
                case "index":
                  return {
                    updateOne: {
                      filter: { _id: document._id },
                      update: { $set: document },
                      upsert: true,
                    },
                  };
                case "create":
                  return { insertOne: { document } };
                case "delete":
                  return {
                    deleteOne: { filter: { _id: document._id } },
                  };
                case "update":
                  return {
                    updateOne: {
                      filter: { _id: document._id },
                      update: { $set: document },
                    },
                  };
              }
            });

            return traceLog(
              "Mongo",
              () => mongoDb.collection(collectionKey).bulkWrite(writeBulk),
              [collectionKey]
            ).then((it) => {
              logger.trace(it);
              return it;
            });
          })
        );
      }
    },
  ];
};

type BulkData = { action: Option; document: WithId<object> };
type Option = "index" | "create" | "delete" | "update";
function createTempData() {
  let dataOperator: Record<string, Array<BulkData>> = {};
  return (index: string, data: BulkData) => {
    const key = `${index}`;
    if (key in dataOperator) {
      dataOperator[`${index}`].push(data);
    } else {
      dataOperator[`${index}`] = [data];
    }
    return dataOperator;
  };
}
