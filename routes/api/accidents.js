const router = require('express-promise-router')();
const passport = require('passport');

const accidentController = require('../../controllers/accidents');

const authMiddleware = passport.authenticate('jwt', { session: false });

// READ ALL
router.route('/')
    .get(authMiddleware, accidentController.getAll);

// READ ONE
router.route('/:id')
    .get(authMiddleware, accidentController.getOne);

// READ (SEARCH)
// TODO

// CREATE
router.route('/')
    .post(authMiddleware, accidentController.create);

// UPDATE
router.route('/')
    .put(authMiddleware, accidentController.update);

// DELETE
router.route('/:id')
    .delete(authMiddleware, accidentController.delete);

module.exports = router;
