const INDEX_MAPPING_FILE_PATH = "./index-mapping.json";
const SERVER_PORT = process.env.PORT || "3000";
const ELASTICSEARCH_HOST = `${process.env.ES_HOST}`;

export {
    INDEX_MAPPING_FILE_PATH,
    SERVER_PORT,
    ELASTICSEARCH_HOST
}