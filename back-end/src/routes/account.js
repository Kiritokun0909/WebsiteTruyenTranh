const express = require('express');
const router = express.Router();
const validation = require('../middleware/RegisterBodyValidation.js');
const controller = require('../app/controllers/AccountController.js');

router.post('/register-admin', validation.validRegisterBody, controller.registerAdmin);
router.post('/register-translator', validation.validRegisterBody, controller.registerTranslator);
router.post('/register', validation.validRegisterBody, controller.registerUser);
router.post('/login', validation.validLoginBody, controller.login);


module.exports = router;
