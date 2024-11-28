const express = require('express');
const router = express.Router();

const client_controller = require('../controllers/client_controller');
const staff_controller = require('../controllers/staff_controller');

router.post('/client-login', client_controller.login);
router.post('/staff-login', staff_controller.login);

module.exports = router;
