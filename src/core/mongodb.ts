import { MongoClient } from "mongodb";
import { MONGODB_URL } from "../constants";

export const mongoClient = new MongoClient(MONGODB_URL, {});
mongoClient.on("error", console.error);
mongoClient.connect();
