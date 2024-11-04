import { IncomingMessage, ServerResponse } from "node:http";
import { _searchParams, _searchResponse } from "./_search";

import Koa from "koa";
import { _bulkParams } from "./_bulk";

type TransMiddle = {
  request: (req: IncomingMessage) => Promise<string>;
  response?: (req: IncomingMessage, res: Koa.Response) => Promise<unknown>;
};

export const CUSTOM_TRANS_MAPPER: Record<string, TransMiddle> = {
  _search: {
    request: _searchParams,
    response: _searchResponse,
  },
  _bulk: {
    request: _bulkParams,
  },
};
