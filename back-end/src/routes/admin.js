const express = require('express');
const router = express.Router();

const controller = require('../app/controllers/AdminController.js');


router.use('/', controller.index);


module.exports = router;
