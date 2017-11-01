module.exports = (env) => {
    const express = require('express');
    const router = express.Router();
    const User = require('../db/models/user');

    router.use((req,res,next) => {
        if(!req.user) {
            res.send(403, 'unauthorized');
        } else {
            next();
        }
    });

    router.get('/', (req, res, next) => {
        const user_id = req.user._id;
        User.findById(user_id).select('-local.password -__v -projects').exec().then(data => {
            res.json(data);
        }).catch(err => {
            res.json({error: err});
        });
    });

    router.post('/find', (req,res) => {
        const user_id = req.user._id;
        const { username } = req.body;

        User.find({ 'local.username': username }).select('-local.password -__v -projects').then(data => {
                res.json(data);
        }).catch(err => {
            res.json({error: err});
        });
    });









     return router;
}