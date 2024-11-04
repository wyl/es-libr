import { IncomingMessage } from "node:http";
import through2 from "through2";
import streamEach from "stream-each";

import ndjson from "ndjson";
import { LiteTransform } from "../lite-transform";
import { indexMapping } from "../../global";

export async function _bulkParams(req: IncomingMessage) {
  const lines = through2.obj();
  return new Promise<string>((resolve, reject) => {
    let body = "";
    streamEach(
      req.pipe(ndjson.parse()),
      (data, next) => {
        const trans = new LiteTransform(
          data,
          indexMapping()["caas-cn-zaobao-online"].mapping()
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
      .on("end", () => resolve(body))
      .on("error", (err) => reject(err));
  });
}
