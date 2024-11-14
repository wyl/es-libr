import { transHandlerList } from "./method";
import { app } from "../app";
import supertest from "supertest";

// const mockFn = jest.fn();
// describe.each(transHandlerList)('Method $title"', ({ title, routes }) => {
//   const a = mockFn();
//   a.mockReturnValue(42);

//   routes.forEach((route) => {
//     const k = jest.fn((x) => 42 + x);

//     const [method, path] = route.split(" ");
//     const t = supertest(app.callback());

//     const requestMethod = getRequestMethod(method);
//     if (!requestMethod) return;

//     requestMethod(path)
//       .set("Content-Type", "application/json")
//       .send({ query: { match_all: {} } })
//       .expect(200);
//   });
// });

const a = {
  authorize: () => "token",
  isAuthorized: (secret: string) => secret === "wizard",
};

test("if utils mocked automatically", () => {
  expect(a.authorize.mock).toBeTruthy();
});
describe("test _search", () => {
  describe("give an invlid query", () => {
    test("Case 01", () => {
      expect(() => "AAA").toStrictEqual("AAA");
      expect(() => "AAA").toThrow("AAA");
      expect(() => "AAA").toBe("AAA");
    });
    test("Case 02", () => {});
    test("Case 03", () => {});
    test("Case 04", () => {});
  });
  describe("give a valid  query", () => {});
});
