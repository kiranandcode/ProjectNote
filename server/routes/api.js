module.exports = (env) => {
    const express = require('express');
    const router = express.Router();

    const project = require('./project')(env);
    const user = require('./user')(env);

    router.use((req,res,next) => {
        if(!req.user) {
            res.send(403, 'unauthorized');
        } else {
            next();
        }
    });

    router.use('/project', project);
    router.use('/user', user);

     return router;
}