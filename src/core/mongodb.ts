import { MongoClient } from "mongodb";
import { MONGODB_URL } from "../constants";

export const mongoClient = new MongoClient(MONGODB_URL, {});
mongoClient.on("connect", () => {
  console.log("Connected to MongoDB");
});
mongoClient.on("close", () => {
  console.log("Disconnected from MongoDB");
});
mongoClient.on("error", console.error);
