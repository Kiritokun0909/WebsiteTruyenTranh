const express = require('express');
const router = express.Router();

const controller = require('../app/controllers/SiteController.js');


router.use('/genres', controller.getListGenre);
router.use('/genre/:genreId', controller.getGenre);

router.use('/mangas/genreId=:genreId&pageNumber=:pageNumber', controller.getListMangaByGenre);
router.use('/mangas/pageNumber=:pageNumber', controller.getListManga);

router.use('/manga/:mangaId', controller.getManga);
router.use('/chapter/:chapterId', controller.getChapter);

router.use('/', controller.index);


module.exports = router;
