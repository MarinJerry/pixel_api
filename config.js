require('dotenv').config();

const env = process.env.NODE_ENV;

const local = {
    app: {
        port: parseInt(process.env.LOCAL_APP_PORT) || 3000
    },
    db: {
        host: process.env.LOCAL_DB_HOST || 'localhost',
        database: process.env.LOCAL_DB_NAME || 'db',
        user: process.env.LOCAL_DB_USER || 'root',
        password: process.env.LOCAL_DB_PASS || '',
        connectionLimit: 10,
        dateStrings: true
    },
    listPerPage: 50
};

const dev = {
    app: {
        port: parseInt(process.env.DEV_APP_PORT) || 3000
    },
    db: {
        host: process.env.DEV_DB_HOST || 'localhost',
        database: process.env.DEV_DB_NAME || 'db',
        user: process.env.DEV_DB_USER || 'root',
        password: process.env.DEV_DB_PASS || '',
        connectionLimit: 10,
        dateStrings: true
    },
    listPerPage: 50
};

const prod = {
    app: {
        port: parseInt(process.env.PROD_APP_PORT) || 3000
    },
    db: {
        host: process.env.PROD_DB_HOST || 'localhost',
        database: process.env.PROD_DB_NAME || 'db',
        user: process.env.PROD_DB_USER || 'root',
        password: process.env.PROD_DB_PASS || '',
        connectionLimit: 10,
        dateStrings: true
    },
    listPerPage: 50
};

const config = {
    local,
    dev,
    prod
};

module.exports = config[env];