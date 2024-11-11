import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  expect,
  test,
} from "@jest/globals";
import { replaceKeysInBody } from "./lib";
import { indexMapping, initGlobal } from "./global";

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

let currentMapping: Record<string, string>;
beforeAll(async () => {
  await initGlobal();
  currentMapping = indexMapping()["caas-cn-zaobao-online"].mapping();
});

const testMapping = [
  ["hello", "hello"],
  ["data.context.id", "data_context_id"],
];

test("replaceBodyInBody ", () => {
  expect(replaceKeysInBody("hello", currentMapping)).toBe("hello");
  expect(replaceKeysInBody("data.context.id", currentMapping)).toBe(
    "data_context_id"
  );
  expect(
    replaceKeysInBody(
      [{ "data.context.id": 33 }, { "data.context.id": 44 }],
      currentMapping
    )
  ).toStrictEqual([{ data_context_id: 33 }, { data_context_id: 44 }]);
});
