class MangaController {
    
    // [GET] /home
    index(req, res) {
        res.send('<h1>Hello World!</h1>');
    }

    // [GET] /
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

    getMangaInfo(req, res) {
        const mangaId = req.params.id;
        
        res.send('Show manga id = ' + mangaId);
    }

    getMangaChapter(req, res) {
        const mangaId = req.params.mangaId;
        const chapterId = req.params.id;
        
        res.send('Manga ID = ' + mangaId + ', chapterId = ' + chapterId);
    }
}

module.exports = new MangaController;
