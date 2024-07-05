const express = require('express');
const router = express.Router();

const controller = require('../app/controllers/AccountController.js');


router.use('/register', controller.register);
router.use('/', controller.index);


module.exports = router;
