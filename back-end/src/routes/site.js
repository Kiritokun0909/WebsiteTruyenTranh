const express = require('express');
const router = express.Router();

const controller = require('../app/controllers/SiteController.js');

router.use('/roles', controller.getAllRoles);
router.use('/genres', controller.getAllGenres);
router.use('/privacy', controller.privacy);
router.use('/', controller.index);


module.exports = router;
