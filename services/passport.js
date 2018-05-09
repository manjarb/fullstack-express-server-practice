const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
           done(null, user);
        });
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
        /*console.log(accessToken, 'accessToken');
        console.log(refreshToken, 'refreshToken');
        console.log(profile, 'profile');*/

       /* User.findOne({ googleId: profile.id })
            .then((existingUser) =>{
                if (existingUser) {
                    // already dave a record with given profile ID
                    done(null, existingUser);
                } else {
                    // Don't have user with current profile id
                    new User({ googleId: profile.id })
                        .save()
                        .then(user => done(null, user));
                }
            });*/

        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
            // already dave a record with given profile ID
            return done(null, existingUser);
        }
        // Don't have user with current profile id
        await new User({ googleId: profile.id }).save();
        done(null, user)
    })
);