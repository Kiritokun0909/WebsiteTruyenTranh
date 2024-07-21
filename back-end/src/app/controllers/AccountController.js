const accountService = require('../services/AccountService.js');
const { generateToken } = require('../../middleware/jwt.js');


const registerAccount = async (req, res, role) => {
    const { username, email, password } = req.body;
    try {
        const result = await accountService.register(username, email, password, role);
        
        if(result && result.code == accountService.EMAIL_EXIST_CODE) {
            res.status(409).json({ message: result.message });
            return;
        }

        if(result && result.code == accountService.REGISTER_SUCCESS_CODE) {
            res.status(201).json({ message: result.message });
            return;
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to register account.' });
    }
}


const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await accountService.login(email, password);

        if(result && result.code == accountService.LOGIN_FAILED_CODE) {
            res.status(401).json({ message: result.message });
            return;
        }

        if(result && result.code == accountService.LOGIN_SUCCESS_CODE) {
            const token = generateToken(result.accountId, result.roleId);
            res.status(200).json({ token: token, roleId: result.roleId, message: result.message });
            return;
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to login account.' });
    }
}

class AccountController {
    // [GET] /account/index
    async index(req, res) {
        res.send('Hello logout');
    }

    // [POST] /account/login
    async login(req, res) {
        return await login(req, res);
    }

    // [GET] /account/logout
    async logout(req, res) {
        res.send('Logout successfully.');
    }

    // [POST] /account/register
    async registerUser(req, res) {
        return await registerAccount(req, res, accountService.RoleEnum.USER);
    }

    // [POST] /account/register
    async registerTranslator(req, res) {
        return await registerAccount(req, res, accountService.RoleEnum.TRANSLATOR);
    }

    // [POST] /account/register
    async registerAdmin(req, res) {
        return await registerAccount(req, res, accountService.RoleEnum.ADMIN);
    }
}

module.exports = new AccountController;