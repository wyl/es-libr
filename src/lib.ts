import { info } from "console";
import { logger } from "../logger";
import { ENABLE_DB } from "./constants";

async function traceLog<T, K extends string>(
  type: K,
  func: () => PromiseLike<T>,
  context?: Array<string>
): Promise<T | undefined> {
  const t0 = performance.now();
  const ignore = !ENABLE_DB && type === "Mongo";

  if (ignore) {
    logger.warn(
      `[${type}] Operatoinal data not enabled! Pretend that the data is returned correctly.Ignore this warning message!`
    );
    return undefined;
  }
  return func().then((res) => {
    logger.info(
      `[${type}] ${context} ${(performance.now() - t0).toFixed(2)} ms `
    );
    logger.trace(JSON.stringify(res));
    return res;
  });
}

function replaceKeysInBody(
  source: unknown,
  mapper: Record<string, string>
): unknown {
  if (
    source === undefined ||
    source === null ||
    Object.keys(mapper).length === 0
  ) {
    return source;
  }
  if (Array.isArray(source)) {
    return source.map((item) => replaceKeysInBody(item, mapper));
  }

  if (typeof source === "string") {
    return mapper[source] || source;
  }

  if (typeof source === "object") {
    let newObject: Record<string, unknown> = {};
    const newObject1 = source as Record<string, unknown>;
    for (const key in source) {
      if (key === "_source") {
        continue;
      }
      const newKey = mapper[key] || key;
      newObject[newKey] = replaceKeysInBody(
        newObject1[key] as Record<string, unknown>,
        mapper
      );
    }
    return newObject;
  }
  return source;
}

export { replaceKeysInBody, traceLog };
