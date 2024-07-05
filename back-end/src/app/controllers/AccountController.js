const accountService = require('../../services/AccountService.js');

class AccountController {

    index(req, res) {
        res.send('Trang tài khoản');
    }

    login(req, res) {
        res.send('login thành công');
    }

    async register(req, res) {
        const { username, email, password } = req.body;
        try {
            const result = await accountService.register(username, email, password);
            res.status(201).json({ message: 'User registered successfully' });
        } catch (err) {
            res.status(500).json({ message: 'Failed to register user' });
        }
    }


}

module.exports = new AccountController;