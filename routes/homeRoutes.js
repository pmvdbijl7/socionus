const router = require('express').Router();
const homeController = require('../controllers/homeController');
const accessController = require('../controllers/accessController');

// Register
router.get('/', accessController.checkAuthenticated, homeController.homeGet);

module.exports = router;
