const router = require('express-promise-router')();
const passport = require('passport');

const passportConf = require('../../src/passport');
const { validateBody, schemas } = require('../../helpers/routeHelpers');
const userController = require('../../controllers/users');

//const jwtAuthMiddleware = passport.authenticate('jwt', { session: false });
//const localAuthMiddleware = passport.authenticate('local', { session: false });

const jwtAuthMiddleware = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (error, user) => {
        //console.log('user:', user);
        if(error || !user)
            res.status(401).json({ message: 'unauthorized' });
        else
        {
            req.user = user;
            next();
        }

    })(req, res, next);
}

const localAuthMiddleware = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err || !user) return res.status(401).json(info);
        req.user = user;
        next();
    })(req, res, next);
}

// signup route: run by validation then to user controller
router.route('/signup')
    .post(validateBody(schemas.signUpSchema)    // JOI validation
        , userController.signUp);               // user controller

// signin route: run by validation then authentication then to user controller
router.route('/signin')
    .post(validateBody(schemas.signInSchema)    // JOI validation
        , localAuthMiddleware                   // Authentification
        , userController.signIn);               // user controller

// this is the a test api route this route only works if you passed the jwt auth
router.route('/api/accidents')
    .get((req, res, next) => {
        console.log('req:', req.headers);
        next();
    }                                           // No validation
        ,jwtAuthMiddleware                      // Authentification
        , userController.accidentsApi)          // user controller
    .post((req, res, next) => {
        console.log('headers:', req.headers);
        console.log('body:', req.body);
        res.status(200).json({ message: 'hey boi'})
    });

module.exports = router;
