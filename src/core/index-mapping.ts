import fs from "fs";

export type IndexMappings = Record<string, IndexMappingTool>;

type IndexMapping = {
  index: string;
  mapper: FieldsMapper;
};
type FieldsMapper = {
  [key: string]: {
    type: Record<string, unknown>;
    reName: string;
  };
};

async function loadIndexMapping(filePath: string) {
  let indexMappings: IndexMappings = {};
  try {
    const tmp = JSON.parse(
      fs.readFileSync(filePath, "utf-8")
    ) as Array<IndexMapping>;
    indexMappings = Object.fromEntries(
      tmp.map((it) => {
        return [it.index, new IndexMappingTool(it.index, it.mapper)];
      })
    );
  } catch (error) {
    throw new Error(`load index mapping error from "${filePath}" : ` + error);
  }
  return () => indexMappings;
}

class IndexMappingTool {
  index: string;
  mapper: FieldsMapper;

  constructor(index: string, mapper: FieldsMapper) {
    this.index = index;
    this.mapper = mapper;
  }

  buildCreateIndexBody() {
    return this.mapper;
  }

  mapping() {
    return Object.fromEntries(
      Object.entries(this.mapper).map(([key, value]) => {
        return [key, value.reName];
      })
    );
  }
}

export { loadIndexMapping };
