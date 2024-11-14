import request from "supertest";
import { app } from "./app";
import { initServer, stopServer } from "./global";

beforeAll(initServer);

afterAll(stopServer);

test("test", async () => {
  const response = await request(app.callback()).get("/");
  expect(response.status).toBe(200);
  expect(response.text).toMatchSnapshot();
});
