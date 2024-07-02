class SiteController {
    
    // [GET] /
    index(req, res) {
        res.send('<h1>Hello World!</h1>');
    }

    // [GET] /privacy
    privacy(req, res) {
        res.send('Privacy');
    }

    
}

module.exports = new SiteController;
