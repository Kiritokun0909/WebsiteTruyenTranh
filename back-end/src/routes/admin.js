const express = require('express');
const router = express.Router();

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });


const validation = require('../middleware/AdminRouteValidation.js');
const controller = require('../app/controllers/AdminController.js');


router.post('/upload-manga'
            , validation.validUploadMangaBody
            , upload.single('coverImage')
            , controller.uploadManga);
router.delete('/remove-manga/:mangaId', controller.removeManga);

router.put('/hide-manga/:mangaId', controller.hideManga);
router.put('/unhide-manga/:mangaId', controller.unhideManga);

router.post('/upload-chapter/:mangaId'
            , validation.validUploadChapterBody
            , upload.array('chapterImages')
            , controller.uploadChapter);


module.exports = router;
