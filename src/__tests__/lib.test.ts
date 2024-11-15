import { traceLog } from '../lib'

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
