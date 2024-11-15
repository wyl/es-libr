import { isStatusOk, replaceKeysInBody, traceLog } from '../lib'

// beforeAll(() => console.log("1 - beforeAll"));
// afterAll(() => console.log("1 - afterAll"));
// beforeEach(() => console.log("1 - beforeEach"));
// afterEach(() => console.log("1 - afterEach"));

// test("", () => console.log("1 - test"));

// function sum(a: number, b: number) {
//   return a + b;
// }

// test("adds 1 + 2 to equal 3", () => {
//   const doc = expect(sum(1, 2)).toBe(3);
// });

const tables: Array<unknown> = [
  0,
  'FOO',
  true,
  false,
  null,
  undefined,
  NaN,
  Infinity,
  -Infinity,
  1,
  0.1,
  -1,
  -0.1,
]

describe('traceLog', () => {
  test.each(tables)('traceLog(%p)', async (input) => {
    const expected = await traceLog('test', () => Promise.resolve(input))
    expect(expected).toBe(input)
  })
})

const isStatusOkTables: Array<[number, boolean]> = [
  [200, true],
  [201, true],
  [404, false],
  [405, false],
  [500, false],
]

describe('isStatusOk Testing', () => {
  test.each(isStatusOkTables)('isStatusOk(%p)', (input, expected) => {
    expect(isStatusOk(input)).toBe(expected)
  })
})

const defaultMapper = {
  'data.source.id': 'data_source_id',
  'data.source.name': 'data_source_name',
  'data.source.age': 'data_source_age',
}

const replaceKeysInBodyTables: Array<[unknown, unknown]> = [
  [{ 'data.source.id': '1' }, { data_source_id: '1' }],
  [
    { 'data.source.id': '1', 'data.source.name': 'foo' },
    { data_source_id: '1', data_source_name: 'foo' },
  ],
  [
    { 'data.source.id': '1', 'data.source.name': 'foo', 'data.source.age': 20 },
    { data_source_id: '1', data_source_name: 'foo', data_source_age: 20 },
  ],
  [
    {
      'data.source.id': '1',
      'data.source.name': 'foo',
      'data.source.age': 20,
      'data.source.name2': 'foo2',
    },
    {
      data_source_id: '1',
      data_source_name: 'foo',
      data_source_age: 20,
      'data.source.name2': 'foo2',
    },
  ],
]

describe('replaceKeysInBody Testing', () => {
  test.each(replaceKeysInBodyTables)(
    'replaceKeysInBody(%p)',
    (input, expected) => {
      expect(replaceKeysInBody(input, defaultMapper)).toStrictEqual(expected)
    },
  )
})
