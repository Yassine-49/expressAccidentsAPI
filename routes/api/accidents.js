const router = require('express-promise-router')();
const passport = require('passport');

const passportConf = require('../../src/passport');
const { validateBody, schemas } = require('../../helpers/routeHelpers');
const accidentController = require('../../controllers/accidents');

//const JwtAuthMiddleware = passport.authenticate('jwt', { session: false });
const jwtAuthMiddleware = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (error, user) => {
        //console.log('user:', user);
        if(error || !user)
            res.status(401).json({ message: '[e] Unauthorized' });
        else
        {
            req.user = user;
            next();
        }

    })(req, res, next);
}

// removed authentification middleware while testing front-end

// READ ALL
router.route('/')
    .get((req, res, next) => next()
        , jwtAuthMiddleware
        , accidentController.getAll);

// READ ONE
router.route('/:id')
    .get(jwtAuthMiddleware, accidentController.getOne);

// READ (SEARCH)
// TODO

// CREATE
router.route('/')
    .post(validateBody(schemas.addEntrySchema)
        , jwtAuthMiddleware
        , accidentController.create);

// UPDATE
router.route('/')
    .put((req, res, next) => next()
        , jwtAuthMiddleware
        , accidentController.update);

// DELETE
router.route('/:id')
    .delete((req, res, next) => {
        console.log('req.body:', req.body);
        console.log('req.headers:', req.headers);
        next();
    }
        ,jwtAuthMiddleware
        , accidentController.delete);

module.exports = router;
