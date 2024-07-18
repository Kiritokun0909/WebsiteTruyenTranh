const accountService = require('../services/AccountService.js'); // Adjust the path as needed
const siteService = require('../services/SiteService.js');
const HANDLE_CODE = require('../../configs/HandleCode.js')
const HTTP_STATUS = require('../../configs/HttpStatusCode.js')

class SiteController {
    
    // [GET] /
    index(req, res) {
        res.send('<h1>Hello World!</h1>');
    }

    // [GET] /roles
    async getAllRoles(req, res){
        const data = await accountService.getListRole();
        res.json(data);
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

    // [GET] /manga/{id}
    async getManga(req, res){
        let mangaId = parseInt(req.params.id, 10);

        if (isNaN(mangaId) || mangaId < 1) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Invalid MangaId' });
            return;
        }

        try {
            const result = await siteService.getManga(mangaId);
            if(result.manga.length > 0 ){
                res.json(result);
                return;
            }
        } catch (err) { }
        res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Failed to get manga.' });
    }

    // [GET] /chapter/{id}
    async getChapter(req, res){
        const chapterId = parseInt(req.params.chapterId, 10);

        if (isNaN(chapterId) || chapterId < 1) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Invalid ChapterId' });
            return;
        }

        try {
            const result = await siteService.getChapter(chapterId);
            res.json(result);
            return;
        } catch (err) { }
        res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Failed to get chapter.' });
    }
}

module.exports = new SiteController;
