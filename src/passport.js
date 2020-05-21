const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('../models').User;

// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}, async (payload, done) => {
    console.log('payload:', payload);
    try {
        // find the specified user in token
        const user = await User.findByPk(payload.sub);
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
        const user = await User.findOne({ where: {username} });
        // if user not found handle error
        if(!user)
            return done(null, false, { message: 'incorrect username'});
        // if user found check password
        const isCorrect = await User.isValidPassword(user, password);
        // if password incorrect handle error
        if(!isCorrect)
            return done(null, false, { message: 'incorrect password'});
        // if password correct return user
        done(null, user, { message: 'login successful' });
    } catch (error) {
        done(error, false);
    }
}));
