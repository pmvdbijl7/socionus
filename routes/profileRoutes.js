const router = require('express').Router();
const profileController = require('../controllers/profileController');
const accessController = require('../controllers/accessController');

router.get(
	'/profile',
	accessController.checkAuthenticated,
	profileController.profileGet
);

module.exports = router;
