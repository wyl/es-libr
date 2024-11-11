import { IncomingMessage } from "node:http";

import Koa from "koa";
import { ParamData } from "path-to-regexp";
import { logger } from "../../../logger";

export const _deleteHandler = (
  req: IncomingMessage,
  res: Koa.Response,
  params: ParamData
) => {
  const { index, _id } = params as { index: string; _id: string };
  return [
    async () => Promise.resolve(""),
    async () => {
      logger.warn("unsupport delete by query ");
    },
  ];
};
