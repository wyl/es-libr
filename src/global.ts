import { INDEX_MAPPING_FILE_PATH } from "./constants";
import { IndexMappings, loadIndexMapping } from "./init/init-index-mapping";

let indexMapping: () => IndexMappings;
async function initGlobal() {
    indexMapping  = await loadIndexMapping(INDEX_MAPPING_FILE_PATH);
}

export {initGlobal, indexMapping};