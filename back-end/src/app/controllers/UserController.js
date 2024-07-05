class UserController {

    index(req, res) {
        res.send('trang user');
    }


}

module.exports = new UserController;