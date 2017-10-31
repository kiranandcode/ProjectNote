
module.exports = (env) => {
    // express packages
    const express = require('express');
    const bodyParser = require('body-parser');
    const session = require('express-session');

    // authentication packages
    const passport = require('passport')(env);

    // database packages
    const MongoStore = require('connect-mongo')(session);
    const dbConnection = require('./db')(env);

    // logging packages
    const morgan = require('morgan');


    // main application
    const app = express();
    const PORT = env.PORT;

    // ---- MIDDLE WARE -----
    // logging middleware
    app.use(morgan('dev'));
    app.use(
        bodyParser.urlencoded({
            extended: false
        })
    );
    app.use(bodyParser.json())
    app.use(
        session({
            secret: env.SECRET,
            store: new MongoStore({ mongooseConnection: dbConnection }),
            resave: false,
            saveUninitialized: false
        })
    )

    app.use(passport.initialize())
    app.use(passport.session())

    let auth = require('./auth')(env, passport);
    app.use('/auth', auth);

    // production step
    if (env.PRODUCTION) {
        const path = require('path');
        console.log("RUNNING IN PRODUCTION ENVIRONMENT");

        app.use(express.static(path.join(__dirname, 'build')));


        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, './build/index.html'));
        });
    }



    app.use((err, req, res, next) => {
        console.log('=========== ERROR ============');
        console.error(err.stack);
        res.status(500);
    })


    return app;
};