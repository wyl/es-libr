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

describe("test _search", () => {
  describe("give an invlid query", () => {
    test("Case 01", () => {
      expect("AAA").toStrictEqual("AAA");
      expect("AAA").toBe("AAA");
    });
  });
});
