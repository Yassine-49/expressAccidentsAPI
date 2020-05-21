const JWT = require('jsonwebtoken');

const AccidentEntry = require('../models').AccidentEntry;
const User = require('../models').User;

signToken = user => {
    return JWT.sign({
        iss: 'accidentsReporter',
        sub: user.id,
        iat: new Date().getDate(),
        exp: new Date().setDate(new Date().getDate()+1)
    }, process.env.JWT_SECRET);
}

module.exports = {
    // create a new user and generate a token
    signUp: async (req, res, next) => {
        try{
            // create a new user
            const newRecord = await User.create({
                ...req.body
            });
            // generate a token
            const token = signToken(newRecord);
            res.status(200).json({
                email: newRecord.dataValues.email,
                username: newRecord.dataValues.username,
                token,
                message: 'User created!',
            });
        } catch(error)
        {
            console.log('[e]error:', error);
            res.status(200).json({ ...error });
        }
    },

    // generate a token for logged in user
    signIn: async (req, res, next) => {
        // generate token
        const token = signToken(req.user);
        res.status(200).json({
            email: req.user.dataValues.email,
            username: req.user.dataValues.username,
            token,
            message: 'User logged in!',
        });
    },

    // get user markers
    accidentsApi: async (req, res, next) => {
        console.log('user id:', req.user.id);
        try{
            const result = await AccidentEntry.findAll({
                where: {
                    userId: req.user.id,
                }
            })
            res.json(result);
        } catch(error)
        {
            next(error);
        }
    }
}