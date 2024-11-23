const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const test_controller = require('../controllers/test_controller');

// A simple test url to check that all of our files are communicating correctly.
router.get('/test', test_controller.test);

module.exports = router;
