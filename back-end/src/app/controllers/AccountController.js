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


const updateUsername = async (req, res) => {
    const accountId  = req.user.id;
    const { newUsername } = req.body;
    try {
        const result = await accountService.updateUsername(accountId, newUsername);

        if(result && result.code == accountService.UPDATE_SUCCESS_CODE) {
            res.status(200).json({ message: result.message });
            return;
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to update username.' });
    }
}


const changePassword = async (req, res) => {
    const accountId  = req.user.id;
    const { newPassword } = req.body;
    try {
        const result = await accountService.changePassword(accountId, newPassword);

        if(result && result.code == accountService.UPDATE_SUCCESS_CODE) {
            res.status(200).json({ message: result.message });
            return;
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to update password.' });
    }
}


class AccountController {
    // [GET] /account/index
    async index(req, res) {
        res.send('Hello logout');
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

    // [POST] /account/login
    async login(req, res) {
        return await login(req, res);
    }

    // [GET] /account/logout
    async logout(req, res) {
        res.send('Logout successfully.');
    }

    // [POST] /account/update-username
    async updateUsername(req, res) {
        return await updateUsername(req, res);
    }

    // [POST] /account/update-password
    async changePassword(req, res) {
        return await changePassword(req, res);
    }
}

module.exports = new AccountController;