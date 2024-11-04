const INDEX_MAPPING_FILE_PATH = "./index-mapping.json";
const SERVER_PORT = process.env.PORT || "3000";
const ELASTICSEARCH_HOST = `${process.env.ES_HOST}`;
const ELASTICSEARCH_API_KEY = `${process.env.ES_API_KEY}`;

export {
    INDEX_MAPPING_FILE_PATH,
    SERVER_PORT,
    ELASTICSEARCH_API_KEY,
    ELASTICSEARCH_HOST
}