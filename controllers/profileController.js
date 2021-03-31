const profileGet = (req, res) => {
	res.render('pages/profile/view', {
		title: `${req.user.username}`,
		user: req.user,
	});
};

module.exports = {
	profileGet,
};
