module.exports = (env, passport) => {
    const express = require('express');
    const router = express.Router();
    const User = require('../db/models/user');

    router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
    router.get('/google/callback', passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));


    router.get('/user', (req, res, next) => {
        if (req.user) {
            return res.json({ user: req.user });
        } else {
            return res.json({ user: null });
        }
    });


    router.post('/login', (req, res, next) => {
        if (!env.PRODUCTION) {
            console.log(req.body);
        }
        next();
    },
    passport.authenticate('local'),
     (req,res) => {
         const user  = JSON.parse(JSON.stringify(req.user));
         const cleanUser = Object.assign({}, user);


         if(cleanUser.local) {
             delete(cleanUser.local.password);
         }

         res.json({user: cleanUser});
     });


     router.post('/logout', (req,res) => {
         if(req.user) {
             req.session.destroy();
             req.clearCookie();
             return res.json({msg: 'logging you out'});
         }
         else {
             return res.josn({msg: 'no user to log out'});
         }
     });

     router.post('/signup', (req,res) => {
        const { username, password } = req.body;


        User.findOne({ 'local.username': username }, (err, userMatch) => {
            if(userMatch) {
                return res.json({
                    error: 'Sorry, already exists user with the username: ' + username
                });
            }

            const newUser = new User({
                'local.username': username,
                'local.password': password
            })

            newUser.save((err, savedUser) => {
                if(err) return res.json(err);
                else return res.json(savedUser);
            });
        })
     });


     return router;
}