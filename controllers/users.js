const JWT = require('jsonwebtoken');

const db = require('../models');

signToken = user => {
    return JWT.sign({
        iss: 'accidentsReporter',
        sub: user.id,
        iat: new Date().getDate(),
        exp: new Date().setDate(new Date().getDate()+1)
    }, process.env.JWT_SECRET);
}

module.exports = {
    signUp: async (req, res, next) => {
        // create a new user
        const newRecord = await db.User.create({
            ...req.body
        });
        // generate a token
        const token = signToken(newRecord);
        res.status(200).json({token});
    },

    signIn: async (req, res, next) => {
        // generate token
        const token = signToken(req.user);
        res.status(200).json({token});
    },

    accidentsApi: async (req, res, next) => {
        res.json('userController.accidentsApi');
    }
}