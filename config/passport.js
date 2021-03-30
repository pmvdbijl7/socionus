const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

function initialize(passport) {
	passport.use(
		new LocalStrategy((username, password, done) => {
			User.findOne({ username: username }, async (err, user) => {
				if (err) {
					return done(err);
				}

				if (!user) {
					return done(null, false, {
						message: 'Incorrect username.',
					});
				}

				// Check if Password is Correct
				const validPass = await bcrypt.compare(password, user.password);
				if (!validPass) {
					return done(null, false, {
						message: 'Incorrect password.',
					});
				}

				return done(null, user);
			});
		})
	);

	passport.serializeUser((user, done) => {
		done(null, user._id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});
}

module.exports = initialize;
