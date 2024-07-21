
function getValueByPath(data: unknown, path: string) {
    const paths = path.split(".");
    let result = data;
    for (const p of paths) {
      if (result === undefined || result === null || typeof result !== "object" || !( p in result)) {
        return result;
      }
      result = (result as Record<string,unknown>)[p]
    }
    return result;
  }
  
  function replaceKeysInBody(source: unknown , mapper: Record<string, string>):unknown  {
    if (source === undefined || source === null) {
      return source
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
        const newKey = mapper[key] || key;
        newObject[newKey] = replaceKeysInBody(newObject1[key] as Record<string, unknown>, mapper);
      }
      return newObject;
    }
    return source
  }
  

  export {getValueByPath, replaceKeysInBody}