const express = require('express');
const router = express.Router();

const validation = require('../middleware/AuthRouteValidation.js');
const controller = require('../app/controllers/AccountController.js');
const authService = require('../app/services/AuthService.js');

const { verifyToken, authorizeRole } =  require('../middleware/jwt.js');


router.put('/update-username', verifyToken, validation.validUpdateUsernameBody, controller.updateUsername);
router.put('/update-password', verifyToken, validation.validUpdatePasswordBody, controller.changePassword);

router.post('/like-manga/:mangaId', verifyToken, controller.like);
router.post('/unlike-manga/:mangaId', verifyToken, controller.unlike);

router.post('/follow-manga/:mangaId', verifyToken, controller.follow);
router.post('/unfollow-manga/:mangaId', verifyToken, controller.unfollow);

router.get('/like-list/pageNumber=:pageNumber', verifyToken, controller.getListLike);
router.get('/follow-list/pageNumber=:pageNumber', verifyToken, controller.getListFollow);

router.post('/comment-manga/:mangaId', verifyToken, controller.commentManga);
router.post('/comment-chapter/:chapterId', verifyToken, controller.commentChapter);

router.use('/index', verifyToken, authorizeRole(authService.RoleEnum.ADMIN), controller.index);


module.exports = router;
