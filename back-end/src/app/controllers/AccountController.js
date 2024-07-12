const accountService = require('../services/AccountService.js');
const HttpStatus = require('../../configs/HttpStatusCode.js');

class AccountController {

    index(req, res) {
        res.send('Trang tài khoản');
    }

    login(req, res) {
        res.send('login thành công');
    }

    // [GET] /account/register
    async register(req, res) {
        const { username, email, password } = req.body;
        try {
            const result = await accountService.register(username, email, password);
            res.status(HttpStatus.CREATED).json({ message: 'User registered successfully' });
        } catch (err) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed to register user' });
        }
    }


}

module.exports = new AccountController;