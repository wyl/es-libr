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

function getValueByPath(source: unknown, mapper: Record<string, string>) {
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
        // newObject['p_source'] = source[key as keyof typeof source];
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

export { replaceKeysInBody };
