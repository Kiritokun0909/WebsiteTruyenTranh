const express = require('express');
const router = express.Router();

const controller = require('../app/controllers/HomeController.js');


router.use('/check/:id', controller.showItem);
router.use('/details', controller.showDetail);
router.use('/', controller.index);


module.exports = router;
