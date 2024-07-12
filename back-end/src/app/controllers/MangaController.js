class MangaController {
    
    // [GET] /home
    index(req, res) {
        res.send('<h1>Hello World!</h1>');
    }

    // [GET] /
    showDetail(req, res) {
        
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
