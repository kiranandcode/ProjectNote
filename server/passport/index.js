module.exports = (env) => {
    const passport = require('passport');
    const LocalStrategy = require('./localstrategy');
    const GoogleStrategy = require('./googleStrategy')(env);
    const User = require('../db/models/user');

    passport.serializeUser((user, done) => {
        done(null, { _id: user._id });
    });


    passport.deserializeUser((id, done) => {
        User.findOne({ _id: id },
            'firstName lastName local.username',
            (err, user) => {
                done(null, user);
            });
    });

    passport.use(LocalStrategy);
    passport.use(GoogleStrategy);


    return passport;
}