const express = require('express');
const router = express.Router();

const validation = require('../middleware/AccountRouteValidation.js');
const controller = require('../app/controllers/AccountController.js');


router.get('/get-username', controller.getUsername);

router.put('/update-username'
            , validation.validUpdateUsernameBody 
            , controller.updateUsername);
router.put('/update-password'
            , validation.validUpdatePasswordBody 
            , controller.changePassword);

router.post('/like-manga/:mangaId', controller.like);
router.post('/unlike-manga/:mangaId', controller.unlike);

router.post('/follow-manga/:mangaId', controller.follow);
router.post('/unfollow-manga/:mangaId', controller.unfollow);

router.get('/like-list/pageNumber=:pageNumber', controller.getListLike);
router.get('/follow-list/pageNumber=:pageNumber', controller.getListFollow);

router.post('/comment-manga/:mangaId'
            , validation.validCommentBody
            , controller.commentManga);
router.post('/comment-chapter/:chapterId'
            , validation.validCommentBody
            , controller.commentChapter);


module.exports = router;
