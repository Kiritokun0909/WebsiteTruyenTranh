const authService = require('../services/AuthService.js');
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
        const result = await authService.login(email, password);

        if(result && result.code == authService.LOGIN_FAILED_CODE) {
            res.status(401).json({ message: result.message });
            return;
        }

        if(result && result.code == authService.LOGIN_SUCCESS_CODE) {
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
    // [POST] /auth/register
    async registerUser(req, res) {
        return await registerAccount(req, res, authService.RoleEnum.USER);
    }

    // [POST] /auth/register-translator
    async registerTranslator(req, res) {
        return await registerAccount(req, res, authService.RoleEnum.TRANSLATOR);
    }

    // [POST] /auth/register-admin
    async registerAdmin(req, res) {
        return await registerAccount(req, res, authService.RoleEnum.ADMIN);
    }

    // [POST] /auth/login
    async login(req, res) {
        return await login(req, res);
    }

    // [GET] /auth/logout
    async logout(req, res) {
        res.send('Logout successfully.');
    }
}

module.exports = new AccountController;