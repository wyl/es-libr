import { indexMapping } from "../global";

function buildPutIndexParam(indexName: string = "test") {
  const indexSettings = indexMapping().filter((it) => it.index === indexName);
  if (indexSettings.length === 0) {
    return {};
  }
  const mapping = indexSettings[0].mapper;
  const k = Object.fromEntries(
    Object.entries(mapping).map(([key, value]) => [value.reName, value.type])
  );

  // indexMapping().map((mapping) => {
  //     mapping.
  // })
}
