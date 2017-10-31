module.exports = (env) => {
    const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    const User = require('../db/models/user');

    const strategy = new GoogleStrategy(
        {
            clientID: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback'
        },
        (token, tokenSecret, profile, done) => {
            if(!env.PRODUCITON) {
                console.log('======== GOOGLE PROFILE ========');
                console.log(profile);
                console.log("============= END ==============");
            }

            const {id, name} = profile;

            User.findOne({'google.googleId': id}, (err, userMatch) => {
                if(err) {
                    return done(null, false);
                }

                if(userMatch) {
                    return done(null, userMatch);
                } else {
                    const newGoogleUser = new User({
                        'google.googleId': id,
                        firstName: name.givenName,
                        lastName: name.lastName,
                    });

                    newGoogleUser.save((err, savedUser) => {
                        if(err) {
                            return done(null, false);
                        } else {
                            return done(null, savedUser);
                        }
                    });
                }
            });
        }
    )


    return strategy;
}