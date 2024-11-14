import { LiteTransformer } from "../lite-transformer";
const mapper = { "foo.bar": "foo_bar", "foo.bar1": "fooBar1" };

const tables: Array<{
  data: object;
  mapper: Record<string, string>;
  expected: unknown;
}> = [
  {
    data: { index: "test" },
    mapper: { index: "indexPP" },
    expected: { indexPP: "test" },
  },
  {
    data: { index: "test" },
    mapper: {},
    expected: { index: "test" },
  },
  {
    data: {
      index: "your_index",
      search: { size: 100, form: 0, _source: ["foo.bar"] },
      sort: [{ "foo.bar": "desc" }],
      query: {
        bool: {
          must: [
            {
              match: {
                "foo.bar": 0,
              },
            },
            {
              match: {
                "foo.bar1": "bar1",
              },
            },
            {
              match: {
                "foo.bar2": "bar1",
              },
            },
          ],
        },
      },
    },
    mapper: mapper,
    expected: {
      index: "your_index",
      search: { size: 100, form: 0 /**_source: ["foo.bar"]**/ },
      sort: [{ foo_bar: "desc" }],
      query: {
        bool: {
          must: [
            {
              match: {
                foo_bar: 0,
              },
            },
            {
              match: {
                fooBar1: "bar1",
              },
            },
            {
              match: {
                "foo.bar2": "bar1",
              },
            },
          ],
        },
      },
    },
  },
];

describe("LiteTransformer Testing", () => {
  test.each(tables)("makeLiteSearch", ({ data, mapper: _mapper, expected }) => {
    const liteTransform = new LiteTransformer(data, _mapper);
    expect(liteTransform.makeLiteSearch()).toEqual(expected);
  });
});
