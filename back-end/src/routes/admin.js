const express = require('express');
const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });


const validation = require('../middleware/AdminRouteValidation.js');
const controller = require('../app/controllers/AdminController.js');


router.post('/upload-manga'
            , upload.single('coverImage')
            , validation.validUploadMangaBody
            , controller.uploadManga);

router.put('/update-manga'
            , upload.single('coverImage')
            , validation.validUploadMangaBody
            , controller.updateManga);
router.delete('/remove-manga/:mangaId', controller.removeManga);

router.put('/hide-manga/:mangaId', controller.hideManga);
router.put('/unhide-manga/:mangaId', controller.unhideManga);

router.post('/upload-chapter/:mangaId'
            , upload.array('chapterImages')
            , validation.validUploadChapterBody
            , controller.uploadChapter);

module.exports = router;
