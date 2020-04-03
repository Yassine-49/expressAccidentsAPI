const router = require('express-promise-router')();
const passport = require('passport');

const passportConf = require('../../src/passport');
const { validateBody, schemas } = require('../../helpers/routeHelpers');
const userController = require('../../controllers/users');

router.route('/signup')
    .post(validateBody(schemas.signUpSchema), userController.signUp);

router.route('/signin')
    .post(validateBody(schemas.signInSchema), passport.authenticate('local', { session: false }), userController.signIn);

router.route('/api/accidents')
    .get(passport.authenticate('jwt', { session: false }), userController.accidentsApi);

module.exports = router;
