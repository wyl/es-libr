import { IncomingMessage } from "node:http";

import Koa from "koa";
import { ParamData } from "path-to-regexp";
import { logger } from "../../../logger";

export const _deleteByQueryHandler = (
  req: IncomingMessage,
  res: Koa.Response,
  params: ParamData
) => {
  const { index, _id } = params as { index: string; _id: string };
  logger.info(`_deleteHandler: ${index}, ${_id}`);
  return [undefined, undefined];
};
