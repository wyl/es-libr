import fs from "fs";

export type IndexMappings = Array<IndexMapping>;
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
  let indexMappings: IndexMappings = [];
  try {
    indexMappings = JSON.parse(
      fs.readFileSync(filePath, "utf-8")
    ) as IndexMappings;
  } catch (error) {
    throw new Error(`load index mapping error from "${filePath}" : ` + error);
  }
  return () => indexMappings;
}

export { loadIndexMapping };
