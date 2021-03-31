const { body } = require('express-validator');
const User = require('../models/User');

// Validation for the register form
const registerValidation = [
	body('username')
		.notEmpty()
		.withMessage('Username is required')
		.bail()
		.isLength({ min: 2, max: 20 })
		.withMessage('Username must be between 2 and 20 characters')
		.bail()
		.custom((value) => !/\s/.test(value))
		.withMessage('No spaces are allowed in the username')
		.bail()
		.custom((value, { req }) => {
			return new Promise((resolve, reject) => {
				// Lowercase filled in username
				const username = req.body.username.toLowerCase();

				User.findOne({ username: username }, (err, user) => {
					if (err) {
						reject(new Error('Server Error'));
					}
					if (Boolean(user)) {
						reject(new Error('This username already exists'));
					}
					resolve(true);
				});
			});
		}),
	body('email')
		.notEmpty()
		.withMessage('Email Address is required')
		.bail()
		.isEmail()
		.withMessage('This is not a valid email address')
		.bail()
		.isLength({ max: 255 })
		.withMessage('Email Address cannot contain more than 255 characters')
		.bail()
		.custom((value, { req }) => {
			return new Promise((resolve, reject) => {
				// Lowercase filled in email address
				const email = req.body.email.toLowerCase();

				User.findOne({ email: email }, (err, user) => {
					if (err) {
						reject(new Error('Server Error'));
					}
					if (Boolean(user)) {
						reject(new Error('This email address already exists'));
					}
					resolve(true);
				});
			});
		}),
	body('password')
		.notEmpty()
		.withMessage('Password is required')
		.bail()
		.isLength({ min: 8 })
		.withMessage('Password must be at least 8 characters long'),
	body('password_repeat')
		.notEmpty()
		.withMessage('Repeat Password is required')
		.bail()
		.custom((value, { req }) => value === req.body.password)
		.withMessage('Passwords do not match'),
];

module.exports = {
	registerValidation,
};
