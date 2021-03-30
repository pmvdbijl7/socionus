const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

const initializePassport = require('../config/passport');
initializePassport(passport);

// Get Register Page
const registerGet = (req, res) => {
	res.render('pages/auth/register', { title: 'Sign Up' });
};

// Register User
const registerPost = async (req, res) => {
	try {
		// Hash Password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		// Create New User
		const user = new User({
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword,
		});

		// Save User
		user.save().then((user) => {
			// Redirect to Sign In page
			res.redirect('/signin');
		});
	} catch {
		// If something goes wrong -> Redirect to Sign Up page
		res.redirect('/signup');
	}
};

// Get Login Page
const loginGet = (req, res) => {
	res.render('pages/auth/login', { title: 'Sign In' });
};

const logout = (req, res) => {
	// Logout Authenticated User
	req.logOut();

	// Redirect to Sign In page
	res.redirect('/signin');
};

module.exports = {
	registerGet,
	registerPost,
	loginGet,
	logout,
};
