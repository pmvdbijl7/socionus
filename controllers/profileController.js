const User = require('../models/User');

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

module.exports = {
	profileGet,
};
