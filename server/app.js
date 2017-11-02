
module.exports = (env) => {
    // express packages
    const express = require('express');
    const bodyParser = require('body-parser');
    const session = require('express-session');

    // authentication packages
    const passport = require('./passport')(env);

    // database packages
    const MongoStore = require('connect-mongo')(session);
    const dbConnection = (require('./db'))(env);

    // logging packages
    const morgan = require('morgan');


    // main application
    const app = express();
    const PORT = env.PORT;

    const methodOverride = require('method-override');
    app.use(methodOverride());
    app.use((req,res,next) => {
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        if('OPTIONS' === req.method) {
            res.send(200);
        } else {
            next();
        }
    });


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
    );

    app.use(passport.initialize())
    app.use(passport.session())

    const auth = require('./auth')(env, passport);
    const api = require('./routes/api')(env);
    app.use('/auth', auth);
    app.use('/api', api);


    //TODO: Setup Auto Pulling from Git

    // production step
    if (env.PRODUCTION) {
        const path = require('path');
        console.log("RUNNING IN PRODUCTION ENVIRONMENT");

        app.use(express.static(path.join(__dirname, 'build')));


        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, './build/'));
        });
    } else {

        const path = require('path');
//        app.use('static', express.static(path.join(__dirname, '../build/static')));

        app.use(express.static(path.join(__dirname, '../build/')));
        app.get('*', (req,res) =>{
            res.redirect('/');
        })

  //      app.get('*', (req, res) => {
 //           res.sendFile(path.join(__dirname, '../build'));
   //     });

    }



    app.use((err, req, res, next) => {
        console.log('=========== ERROR ============');
        console.error(err.stack);
        res.status(500);
    })


    return app;
};