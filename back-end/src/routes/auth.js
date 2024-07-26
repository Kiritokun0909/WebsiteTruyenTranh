const express = require('express');
const router = express.Router();

const validation = require('../middleware/AuthRouteValidation.js');
const controller = require('../app/controllers/AuthController.js');

const { verifyToken } =  require('../middleware/jwt.js');


router.post('/register-admin'
            , validation.validRegisterBody
            , controller.registerAdmin);

router.post('/register-translator'
            , validation.validRegisterBody
            , controller.registerTranslator);

router.post('/register'
            , validation.validRegisterBody
            , controller.registerUser);

router.post('/login'
            , validation.validLoginBody
            , controller.login);
            
router.use('/logout', verifyToken, controller.logout);


module.exports = router;
