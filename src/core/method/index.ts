import { IncomingMessage } from "node:http";
import { _searchHandler } from "./_search";

import Koa from "koa";
import { match, MatchResult, ParamData } from "path-to-regexp";
import { _bulkHandler } from "./_bulk";
import { _deleteHandler } from "./_delete";
import { _emptyHandler } from "./_empty";
import { _getHandler } from "./_get";
import { _updateHandler } from "./_update";
import { _createHandler } from "./_create";

/** @private */
export const transHandlerList: Array<TransHandlerSettings> = [
  {
    title: "Search API",
    routes: [
      "GET /:target/_search",
      "GET /_search",
      "POST /:target/_search",
      "POST /_search",
    ],
    handler: _searchHandler,
  },
  {
    title: "Index API/Create API",
    routes: [
      "PUT /:index/_doc/:_id",
      "POST /:index/_doc/",
      "PUT /:index/_create/:_id",
      "POST /:index/_create/:_id",
    ],
    handler: _createHandler,
  },
  {
    title: "Get API",
    routes: [
      "GET /:index/_doc/:_id",
      "HEAD /:index/_doc/:_id",
      "GET /:index/_source/:_id",
      "HEAD /:index/_source/:_id",
    ],
    handler: _getHandler,
  },
  {
    title: "Delete API",
    routes: ["DELETE /:index/_doc/:_id"],
    handler: _deleteHandler,
  },
  {
    title: "Delete by query API",
    routes: ["POST /:target/_delete_by_query"],
    handler: _emptyHandler,
  },
  {
    title: "Update API",
    routes: ["POST /:index/_update{/:_id}"],
    handler: _updateHandler,
  },
  {
    title: "Update By Query API",
    routes: ["POST /:target/_update_by_query"],
    handler: _emptyHandler,
  },
  {
    title: "Multi get (mget) API",
    routes: ["GET /_mget", "GET /:index/_mget"],
    handler: _emptyHandler,
  },
  {
    title: "Bulk API",
    routes: ["POST /_bulk", "POST /:target/_bulk"],
    handler: _bulkHandler,
  },
];

export function getTransHandler(
  url: string,
  method: string
): TransHandlerResponse | undefined {
  const route = transHandlerList.find((it) =>
    it.routes.find((router) => {
      const [_method, path] = router.split(" ");
      return _method === method.toUpperCase() && match(path)(url);
    })
  );
  if (!route) return undefined;

  const { title, handler, routes } = route;

  return {
    title,
    handler,
    params: routes
      .map((router) => {
        const [_method, path] = router.split(" ");
        return match(path)(url);
      })
      .filter((it) => it !== false)[0],
  };
}

export type TransHandler = (
  req: IncomingMessage,
  res: Koa.Response,
  params: ParamData
) => [undefined | (() => Promise<string>), undefined | (() => Promise<void>)];

type TransHandlerSettings = {
  title: string;
  routes: Array<string>;
  handler: TransHandler;
};

type TransHandlerResponse = {
  title: string;
  params: MatchResult<Partial<Record<string, string | string[]>>>;
  handler: TransHandler;
};
