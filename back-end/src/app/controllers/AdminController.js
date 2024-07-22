class AdminController {
    
    index(req, res) {
        res.send('Trang admin');
    }

    // [POST] /account/login
    async login(req, res) {
        return await login(req, res);
    }

    // [GET] /account/logout
    async logout(req, res) {
        res.send('Logout successfully.');
    }
}

module.exports = new AdminController;