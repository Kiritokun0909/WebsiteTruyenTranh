const express = require('express');
const router = express.Router();

const controller = require('../app/controllers/UserController.js');


router.use('/', controller.index);


module.exports = router;
