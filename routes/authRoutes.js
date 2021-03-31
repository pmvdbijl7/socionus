const router = require('express').Router();
const authController = require('../controllers/authController');
const passport = require('passport');
const accessController = require('../controllers/accessController');
const validationController = require('../controllers/validationController');

// Register
router.get(
	'/signup',
	accessController.checkNotAuthenticated,
	authController.registerGet
);
router.post(
	'/signup',
	accessController.checkNotAuthenticated,
	validationController.registerValidation,
	authController.registerPost
);

// Login
router.get(
	'/signin',
	accessController.checkNotAuthenticated,
	authController.loginGet
);
router.post(
	'/signin',
	accessController.checkNotAuthenticated,
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/signin',
		failureFlash: true,
	})
);

// Logout
router.delete('/logout', authController.logout);

module.exports = router;
