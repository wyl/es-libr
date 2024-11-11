import { IncomingMessage } from "node:http";
import streamEach from "stream-each";
import through2 from "through2";

import Koa from "koa";
import { ObjectId, WithId } from "mongodb";
import ndjson from "ndjson";
import { ParamData } from "path-to-regexp";
import { indexMapping, mongoDb } from "../../global";
import { traceLog } from "../../lib";
import { LiteTransform } from "../lite-transform";
import { TransHandler } from ".";

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
      let _id = "";
      let _type = "";
      const lines = through2.obj();

      return new Promise<string>((resolve, reject) => {
        let body = "";

        console.log("start -01");
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
              _index = _index || Object.values(ndObj).at(0)["_index"];
            } else {
              currDatas = _tmpData(_index, {
                action: _type as Option,
                document: {
                  ...ndObj,
                  _id: new ObjectId(_id.padStart(24, "0")),
                },
              });
            }

            // todo {doc: xxx} 需要处理
            // if (dataKeys.length === 1 && dataKeys.at(0) === "doc") {
            //   ndObj = ndObj["doc"] as Object;
            // }
            const trans = new LiteTransform(
              ndObj,
              indexMapping()[_index].mapping()
            );
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
          .on("end", async () => {
            // TODO  处理 批量 update or delete 的操作。
            // console.log("lines", JSON.stringify(currDatas));
            // for (const [key, values] of Object.entries(currDatas)) {
            await Promise.all(
              Object.entries(currDatas).map(([key, values]) => {
                const writeBulk = values.map((doc) => {
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
                  () => mongoDb.collection(_index).bulkWrite(writeBulk),
                  [_index]
                );
              })
            );
            resolve(body);
          })
          .on("error", (err) => reject(err));

        console.log("start -03");
      });
    },

    async () => {},
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
