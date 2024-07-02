class HomeController {
    
    // [GET] /home
    index(req, res) {
        res.send('<h1>Hello World!</h1>');
    }

    // [GET] /home/details
    showDetail(req, res) {
        const str = [
            {
                "name": "Codr Kai",
                "msg": "This is my first tweet!",
                "username": "codrkai"
            },
            {
                "name": "Samantha Kai",
                "msg": "React JS is so simple!",
                "username": "samanthakai"
            },
            {
                "name": "John K",
                "msg": "Sweep the leg!",
                "username": "johnk"
            }
        ];
        res.end(JSON.stringify(str));
    }

    showItem(req, res) {
        res.send('OK');
    }

    
}

module.exports = new HomeController;
