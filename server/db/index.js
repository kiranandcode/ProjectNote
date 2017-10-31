module.exports = (env) => {
    const mongoose = require('mongoose');
    mongoose.Promise = global.Promise;


    if(env.PRODUCTION) {
        mongoose.connect(env.MONGODB_URL, { useMongoClient: true });
    } else {
        mongoose.connect(env.MONGODB_DEV_URL, {useMongoClient: true});
    }

    const db = mongoose.connection;

    db.on('error', err => {
        console.log("There was an error connecting to the database: " + err);
    });

    db.once('open', () => {
        console.log("Successfully connected to the mongoDB database");
    });

    return db;
}