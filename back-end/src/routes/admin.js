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
            
router.delete('/remove-chapter/:chapterId', controller.removeChapter);


router.post('/upload-chapter/:mangaId'
            , upload.array('chapterImages')
            , validation.validUploadChapterBody
            , controller.uploadChapter);

module.exports = router;
