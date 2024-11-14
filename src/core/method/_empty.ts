import { IncomingMessage } from "node:http";
import { TransHandler } from ".";
import Koa from "koa";
import { ParamData } from "path-to-regexp";
import { logger } from "../../../logger";

export const _emptyHandler: TransHandler = (
  req: IncomingMessage,
  res: Koa.Response,
  params: ParamData
) => {
  logger.warn(`unsupport this router， ${req.url}`);
  return [undefined, undefined];
};
