const User = require('../models/User');

const homeGet = (req, res) => {
	// Get Authenticated User
	const authUserId = req.user._id;

	User.findById(authUserId)
		.then((authUser) => {
			res.render('pages/home', {
				title: 'Home',
				pageName: 'home',
				authUser: authUser,
			});
		})
		.catch((err) => {
			res.send(err.message);
		});
};

module.exports = {
	homeGet,
};
