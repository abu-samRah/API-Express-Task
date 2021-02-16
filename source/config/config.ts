import dotenv from 'dotenv';

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 1337;
const SUCCESS_STATUS = 200;
const ERROR_STATUS = 400;
const OBJ_RESPONSE_CODE = 1;
const ARRAY_RESPONSE_CODE = 2;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const config = {
    server: SERVER,
    SUCCESS_STATUS,
    ERROR_STATUS,
    OBJ_RESPONSE_CODE,
    ARRAY_RESPONSE_CODE
};

export default config;
