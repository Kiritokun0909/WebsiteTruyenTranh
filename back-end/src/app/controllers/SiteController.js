const accountService = require('../services/AccountService.js'); // Adjust the path as needed

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
    
    // [GET] /role
    getAllGenres(req, res){
        // const data = await accountService.getListRole();
        // console.log(data);
        res.json({
            "genres": [
              { "id": 1, "name": "Action" },
              { "id": 2, "name": "Adventure" },
              { "id": 3, "name": "Fantasy" },
              { "id": 4, "name": "Romance" },
              { "id": 5, "name": "Sci-Fi" }
            ]
        });
    }
}

module.exports = new SiteController;
