module.exports = (env) => {
    const mongoose = require('mongoose');
    mongoose.Promise = global.Promise;
    let gracefulShutdown;
    if (env.PRODUCTION) {
        mongoose.connect(env.MONGODB_URL, { useMongoClient: true });
    } else {
        mongoose.connect(env.MONGODB_DEV_URL, { useMongoClient: true });
    }

    const db = mongoose.connection;


    db.on('error', err => {
        console.log("There was an error connecting to the database: " + err);
    });

    db.once('open', () => {
        console.log("Successfully connected to the mongoDB database");
    });


   gracefulShutdown = function (msg, callback) {
        mongoose.connection.close(function () {
            console.log('Mongoose disconnected through ' + msg);
            callback();
        });
    };
    // For nodemon restarts
    process.once('SIGUSR2', function () {
        gracefulShutdown('nodemon restart', function () {
            process.kill(process.pid, 'SIGUSR2');
        });
    });
    // For app termination
    process.on('SIGINT', function () {
        gracefulShutdown('app termination', function () {
            process.exit(0);
        });
    });
    // For Heroku app termination
    process.on('SIGTERM', function () {
        gracefulShutdown('Heroku app termination', function () {
            process.exit(0);
        });
    });



    return db;
}