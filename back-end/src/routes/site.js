const express = require('express');
const router = express.Router();

const controller = require('../app/controllers/SiteController.js');


router.use('/privacy', controller.privacy);


module.exports = router;
