class AdminController {
    
    index(req, res) {
        res.send('Trang admin');
    }


}

module.exports = new AdminController;