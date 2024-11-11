import { Db } from "mongodb";
import { INDEX_MAPPING_FILE_PATH } from "./constants";
import { IndexMappings, loadIndexMapping } from "./core/index-mapping";
import { mongoClient } from "./core/mongodb";

let indexMapping: () => IndexMappings;
let mongoDb: Db;

async function initGlobal() {
  indexMapping = await loadIndexMapping(INDEX_MAPPING_FILE_PATH);

  const imapping = indexMapping();
  await mongoClient.connect();
  mongoDb = mongoClient.db("ES_LIBR");
  // mongoDb.collection("data").findOneAndReplace;

  // const mapping = getIndexMapper("caas-cn-zaobao-online");
  // todo create or update Es Index
}

export { initGlobal, indexMapping, mongoDb };
