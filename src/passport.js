const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');
const db = require('../models');

// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.JWT_SECRET
}, async (payload, done) => {
    try {
        // find the specified user in token
        const user = await db.User.findByPk(payload.sub);
        // if not exists handle error
        if(!user)
            return done(null, false);
        // if exists return user
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

// LOCAL STRATEGY
passport.use(new LocalStrategy({

}, async (username, password, done) => {
    try {
        // find user
        const user = await db.User.findOne({ where: { username} });
        // if user not handle error
        if(!user)
            return done(null, false);
        // if user found check password
        const isCorrect = await db.User.isValidPassword(user, password);
        // if password incorrect handle error
        if(!isCorrect)
            return done(null, false);
        // if password correct return user
        done(null, user);
    } catch (error) {
        done(null, false);
    }
}));
