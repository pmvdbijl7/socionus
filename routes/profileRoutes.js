const router = require('express').Router();
const profileController = require('../controllers/profileController');
const accessController = require('../controllers/accessController');
const uploadController = require('../controllers/uploadController');

// Profile Page
router.get(
	'/:username',
	accessController.checkAuthenticated,
	profileController.profileGet
);

// Profile Settings Page
router.get(
	'/settings/profile',
	accessController.checkAuthenticated,
	profileController.profileSettingsGet
);

// Profile Settings Update
router.put(
	'/settings/profile',
	accessController.checkAuthenticated,
	uploadController.fields([
		{ name: 'banner_image', maxCount: 1 },
		{ name: 'profile_image', maxCount: 1 },
	]),
	profileController.profileSettingsPut
);

module.exports = router;
