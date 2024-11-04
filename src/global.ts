import { INDEX_MAPPING_FILE_PATH } from "./constants";
import { IndexMappings, loadIndexMapping } from "./core/index-mapping";

let indexMapping: () => IndexMappings;

async function initGlobal() {
  indexMapping = await loadIndexMapping(INDEX_MAPPING_FILE_PATH);

  const imapping = indexMapping();

  // const mapping = getIndexMapper("caas-cn-zaobao-online");
  // todo create or update Es Index
}

export { initGlobal, indexMapping };
