import request from "supertest";
import { app } from "./app";
import { initServer, stopServer } from "./global";

beforeAll(initServer);

afterAll(stopServer);

test("test", async () => {
  const response = await request(app.callback()).get("/");
  expect(response.status).toBe(200);
  // expect(response.text).toMatchSnapshot(`{
  //   name: expect.any(String),
  //   cluster_name: expect.any(String),
  //   cluster_uuid: expect.any(String),
  //   version: {
  //     number: expect.any(String),
  //     build_flavor: expect.any(String),
  //     build_type: expect.any(String),
  //     build_hash: expect.any(String),
  //     build_date: expect.any(Date),
  //     build_snapshot: false,
  //     lucene_version: expect.any(String),
  //     minimum_wire_compatibility_version: expect.any(String),
  //     minimum_index_compatibility_version: expect.any(String),
  //   },
  //   tagline: "You Know, for Search",
  // }`);
});
