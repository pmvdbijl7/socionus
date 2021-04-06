const User = require('../models/User');

// Profile Page
const profileGet = (req, res) => {
	// Get Authenticated User
	authUser = req.user;

	// Get Profile User
	profileUser = req.params.username;

	User.findOne({ username: profileUser })
		.then((user) => {
			res.render('pages/profile/view', {
				title: `@${user.username}`,
				pageName: 'profile',
				user: user,
				authUser: authUser,
			});
		})
		.catch((err) => {
			res.send(err.message);
		});
};

// Profile Settings Page
const profileSettingsGet = (req, res) => {
	// Get Authenticated User
	authUser = req.user._id;

	User.findById(authUser)
		.then((user) => {
			res.render('pages/profile/edit', {
				title: 'Edit profile',
				user: user,
			});
		})
		.catch((err) => {
			res.send(err.message);
		});
};

// Profile Settings Update
const profileSettingsPut = (req, res) => {
	// Get Authenticated User
	authUser = req.user._id;

	User.findById(authUser)
		.then((user) => {
			User.findByIdAndUpdate(authUser, {
				banner_image: req.files.banner_image
					? req.files.banner_image[0].filename
					: user.banner_image,
				profile_image: req.files.profile_image
					? req.files.profile_image[0].filename
					: user.profile_image,
				name: req.body.name,
				description: req.body.description,
				location: req.body.location,
				url: req.body.url,
				birthdate: req.body.birthdate,
			})
				.then((updatedUser) => {
					res.redirect(`/${updatedUser.username}`);
				})
				.catch((err) => {
					res.send(err.message);
				});
		})
		.catch((err) => {
			res.send(err.message);
		});
};

module.exports = {
	profileGet,
	profileSettingsGet,
	profileSettingsPut,
};
