const homeGet = (req, res) => {
	res.render('pages/home', { title: 'Home', user: req.user });
};

module.exports = {
	homeGet,
};
