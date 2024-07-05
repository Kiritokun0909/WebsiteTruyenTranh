const accountService = require('../../services/AccountService.js'); // Adjust the path as needed

class SiteController {
    
    // [GET] /
    index(req, res) {
        res.send('<h1>Hello World!</h1>');
    }

    // [GET] /privacy
    privacy(req, res) {
        res.send('Privacy');
    }

    // [GET] /role
    async getAllRoles(req, res){
        const data = await accountService.getListRole();
        console.log(data);
        res.json(data);
    }
    
}

module.exports = new SiteController;
