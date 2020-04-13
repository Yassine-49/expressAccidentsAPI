const router = require('express-promise-router')();
const passport = require('passport');

const accidentController = require('../../controllers/accidents');

const authMiddleware = passport.authenticate('jwt', { session: false });

// READ ALL
router.route('/')
    .get(accidentController.getAll);

// READ ONE
router.route('/:id')
    .get(accidentController.getOne);

// READ (SEARCH)
// TODO

// CREATE
router.route('/')
    .post(accidentController.create);

// UPDATE
router.route('/')
    .put(accidentController.update);

// DELETE
router.route('/:id')
    .delete(accidentController.delete);

module.exports = router;
