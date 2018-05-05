const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        /*console.log(accessToken, 'accessToken');
        console.log(refreshToken, 'refreshToken');
        console.log(profile, 'profile');*/

        User.findOne({ googleId: profile.id })
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
            });
    })
);