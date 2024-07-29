const accountService = require('../services/AccountService.js'); // Adjust the path as needed
const siteService = require('../services/SiteService.js');
const HANDLE_CODE = require('../../configs/HandleCode.js');
const HTTP_STATUS = require('../../configs/HttpStatusCode.js');

class SiteController {
    // [GET] /
    index(req, res) {
        res.send('<h1>Hello World!</h1>');
    }
    
    // [GET] /genres
    async getListGenre(req, res){
        const result = await siteService.getListGenre();
        res.json(result);
    }

    // [GET] /genre/{genreId}
    async getGenre(req, res){
        const genreId = parseInt(req.params.genreId, 10);

        if (isNaN(genreId) || genreId < 1) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Invalid GenreId' });
            return;
        }

        try {
            const result = await siteService.getGenre(genreId);

            if(result && result.code == siteService.NOT_FOUND_CODE) {
                res.status(404).json({ message: result.message });
                return;
            }

            res.json(result);
            return;
        } catch (err) { }
        res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Failed to get genre.' });
    }

    // [GET] /mangas/pageNumber={pageNumber}
    async getListManga(req, res){
        let currentPage = parseInt(req.params.pageNumber, 10) || 1;
        
        if (isNaN(currentPage) || currentPage < 1) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Invalid PageNumber' });
            return;
        }

        try {
            const result = await siteService.getListManga(currentPage, HANDLE_CODE.NUM_OF_ITEM_PER_PAGE);
            res.json(result);
            return;
        } catch (err) { }
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Failed to get list manga' });
    }

    // [GET] /mangas/genreId={genreId}&pageNumber={pageNumber}
    async getListMangaByGenre(req, res){
        const genreId = parseInt(req.params.genreId, 10);
        const currentPage = parseInt(req.params.pageNumber, 10);

        if (isNaN(genreId) || genreId < 1) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Invalid GenreId' });
            return;
        }

        if (isNaN(currentPage) || currentPage < 1) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Invalid PageNumber' });
            return;
        }

        try {
            const result = await siteService.getListMangaByGenre(genreId, currentPage, HANDLE_CODE.NUM_OF_ITEM_PER_PAGE);
            res.json(result);
            return;
        } catch (err) { }
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Failed to get list manga by genre' });
    }

    // [GET] /manga/{mangaId}
    async getManga(req, res){
        let mangaId = parseInt(req.params.mangaId, 10);

        if (isNaN(mangaId) || mangaId < 1) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Invalid MangaId' });
            return;
        }

        try {
            const result = await siteService.getManga(mangaId);

            if(result && result.code == siteService.NOT_FOUND_CODE) {
                res.status(404).json({ message: result.message });
                return;
            }

            if(result.manga.length > 0 ){
                res.json(result);
                return;
            }
        } catch (err) { }
        res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Failed to get manga.' });
    }

    // [GET] /chapter/{chapterId}
    async getChapter(req, res){
        const chapterId = parseInt(req.params.chapterId, 10);

        if (isNaN(chapterId) || chapterId < 1) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Invalid ChapterId' });
            return;
        }

        try {
            const result = await siteService.getChapter(chapterId);

            if(result && result.code == siteService.NOT_FOUND_CODE) {
                res.status(404).json({ message: result.message });
                return;
            }

            res.json(result);
            return;
        } catch (err) { }
        res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Failed to get chapter.' });
    }

    // [GET] /manga/{mangaId}/comment/{pageNumber}
    async getMangaComment(req, res){
        const mangaId = parseInt(req.params.mangaId, 10);
        const pageNumber = parseInt(req.params.pageNumber, 10);;

        if (isNaN(mangaId) || mangaId < 1) {
            res.status(400).json({ error: 'Invalid mangaId' });
            return;
        }

        if (isNaN(pageNumber) || pageNumber < 1) {
            res.status(400).json({ error: 'Invalid pageNumber' });
            return;
        }

        try {
            const result = await siteService.getMangaComment(mangaId, pageNumber, HANDLE_CODE.NUM_OF_COMMENT_PER_PAGE);
            res.status(200).json(result);
            return;
        } catch (err) { }
        res.status(404).json({ error: 'Failed to get manga comments.' });
    }

    // [GET] /manga/{chapterId}/comment/{pageNumber}
    async getChapterComment(req, res){
        const chapterId = parseInt(req.params.chapterId, 10);
        const pageNumber = parseInt(req.params.pageNumber, 10);;

        if (isNaN(chapterId) || chapterId < 1) {
            res.status(400).json({ error: 'Invalid mangaId' });
            return;
        }

        if (isNaN(pageNumber) || pageNumber < 1) {
            res.status(400).json({ error: 'Invalid pageNumber' });
            return;
        }

        try {
            const result = await siteService.getChapterComment(chapterId, pageNumber, HANDLE_CODE.NUM_OF_COMMENT_PER_PAGE);
            res.status(200).json(result);
            return;
        } catch (err) { }
        res.status(404).json({ error: 'Failed to get manga comments.' });
    }

}

module.exports = new SiteController;
