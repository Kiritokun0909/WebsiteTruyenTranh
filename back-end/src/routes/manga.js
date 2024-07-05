const express = require('express');
const router = express.Router();

const controller = require('../app/controllers/MangaController.js');

router.use('/:mangaId/chapter/:id', controller.getMangaChapter);
router.use('/:id', controller.getMangaInfo);
router.use('/', controller.index);


module.exports = router;
