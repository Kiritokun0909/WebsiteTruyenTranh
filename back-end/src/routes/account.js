const express = require('express');
const router = express.Router();

const validation = require('../middleware/AccountRouteValidation.js');
const controller = require('../app/controllers/AccountController.js');
const accountService = require('../app/services/AccountService.js');

const { verifyToken, authorizeRole } =  require('../middleware/jwt.js');

router.post('/register-admin', validation.validRegisterBody, controller.registerAdmin);
router.post('/register-translator', validation.validRegisterBody, controller.registerTranslator);
router.post('/register', validation.validRegisterBody, controller.registerUser);

router.post('/login', validation.validLoginBody, controller.login);
router.use('/logout', verifyToken, controller.logout);

router.post('/update-username', verifyToken, validation.validUpdateUsernameBody, controller.updateUsername);
router.post('/update-password', verifyToken, validation.validUpdatePasswordBody, controller.changePassword);

router.use('/index', verifyToken, authorizeRole(accountService.RoleEnum.ADMIN), controller.index);


module.exports = router;
