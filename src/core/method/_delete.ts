import { IncomingMessage } from "node:http";
import { mongoDb } from "../../global";
import { ElasticsearchDeleteResponse } from "../../types";

import Koa from "koa";
import { ObjectId } from "mongodb";
import { ParamData } from "path-to-regexp";
import { TransHandler } from ".";
import { traceLog } from "../../lib";
import { logger } from "../../../logger";

export const _deleteHandler: TransHandler = (
  req: IncomingMessage,
  res: Koa.Response,
  params: ParamData
) => {
  const { index, _id } = params as { index: string; _id: string };
  return [
    async () => Promise.resolve(""),

    async () => {
      const resData = res.body as ElasticsearchDeleteResponse;

      await traceLog("Mongo", () =>
        mongoDb
          .collection(resData._index)
          .deleteOne({ _id: new ObjectId(_id.padStart(24, "0")) })
      ).then(logger.trace);
    },
  ];
};
