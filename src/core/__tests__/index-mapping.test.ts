import { loadIndexMapping } from "../index-mapping";

const failedPaths = ["error path", "undefined", ""];
const successPaths = ["index-mapping.json"];

describe("loadIndexMapping Testing", () => {
  test.each(failedPaths)("Wrong path [%s]", (path) => {
    expect(loadIndexMapping(path)).rejects.toThrow(
      "load index mapping error from"
    );
  });

  test.each(successPaths)("Success [%s] ", async (path) => {
    const mapping = (await loadIndexMapping(path))();

    expect(mapping).toBeTruthy();
    expect(mapping).toBeInstanceOf(Object);
    expect(mapping).toHaveProperty("caas-cn-zaobao-online");
    expect(mapping).toHaveProperty(
      "caas-cn-zaobao-online.index",
      "caas-cn-zaobao-online"
    );
    expect(mapping).toHaveProperty("caas-cn-zaobao-online.mapping");
    expect(mapping).toMatchSnapshot();

    // Object.entries(mapping["caas-cn-zaobao-online"].mapping()).forEach(
    //   ([key, value]) => {
    //     expect(value).not.toBe(value);
    //   }
    // );
  });
});
