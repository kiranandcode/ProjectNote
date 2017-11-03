const port = process.env.PORT;
const secret = process.env.SECRET;
const production = process.env.NODE_ENV === 'production';
const google_client_id = process.env.GOOGLE_CLIENT_ID;
const google_client_secret = process.env.GOOGLE_CLIENT_SECRET;
const mongo_db_url = 'mongodb://' + process.env.DBNAME + ":" + process.env.KEY + "@" + process.env.DBNAME + ".documents.azure.com:" + process.env.COSMOSPORT + "/?ssl=true";
const mongo_db_local_url = process.env.MONGODB_LOCAL || mongo_db_url;
const gitsecret = process.env.GITSECRET;
const branch  = process.env.BRANCH;

const env = {
    PORT: port,
    SECRET: secret,
    PRODUCTION: production,
    GOOGLE_CLIENT_ID: google_client_id,
    GOOGLE_CLIENT_SECRET: google_client_secret,
    MONGODB_URL: mongo_db_url,
    MONGODB_DEV_URL: mongo_db_local_url,
    GITSECRET: gitsecret ,
    BRANCH: branch
};

console.log(JSON.stringify(env));
module.exports = env;