import { IncomingMessage } from "node:http";
import { TransHandler } from ".";
import Koa from "koa";
import { ParamData } from "path-to-regexp";

export const _emptyHandler: TransHandler = (
  req: IncomingMessage,
  res: Koa.Response,
  params: ParamData
): [() => Promise<string>, () => Promise<void>] => {
  return [() => Promise.resolve("1"), () => Promise.resolve()];
};
