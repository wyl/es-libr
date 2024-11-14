const INDEX_MAPPING_FILE_PATH = "./index-mapping.json";
const SERVER_PORT = process.env.PORT || "3000";
const ELASTICSEARCH_HOST = `${process.env.ES_HOST}`;
const ELASTICSEARCH_API_KEY = `${process.env.ES_API_KEY}`;

const MONGODB_URL = `${process.env.MONGODB_URL}` || "mongodb://localhost:27017";
const ENABLE_DB = process.env.MONGO_ENABLE === "TRUE";

const JEST_TEST_INDEX_NAME = "caas-cn-zaobao-online";

export {
  INDEX_MAPPING_FILE_PATH,
  SERVER_PORT,
  ELASTICSEARCH_API_KEY,
  ELASTICSEARCH_HOST,
  MONGODB_URL,
  ENABLE_DB,
  JEST_TEST_INDEX_NAME,
};
