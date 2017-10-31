module.exports = (env) => {
    const express = require('express');
    const router = express.Router();
    const User = require('../db/models/user');

    const project = require('./project')(env);

    router.use((req,res,next) => {
        if(!req.user) {
            res.send(403, 'unauthorized');
        } else {
            next();
        }
    });

    router.use('/project', project);

     return router;
}