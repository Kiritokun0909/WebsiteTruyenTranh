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
        // console.log(data);
        res.json(data);
    }
    
    // [GET] /genres
    async getListGenre(req, res){
        const data = await siteService.getListGenre();
        // console.log(data);
        res.json({"genres": data});
    }

    // [GET] /mangas/pageNumber=1
    async getListManga(req, res){
        let currentPage = parseInt(req.params.pageNumber, 10) || 1;

        if (isNaN(currentPage) || currentPage < 1) {
            currentPage = 1;
        }

        try {
            const result = await siteService.getListManga(currentPage, HANDLE_CODE.NUM_OF_ITEM_PER_PAGE);
            res.json(result);
        } catch (err) {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch list manga' });
        }
    }

    // [GET] /genre/{id}/pageNumber=1
    async getListMangaByGenre(req, res){
        let genreId = parseInt(req.params.id, 10) || 1;
        let currentPage = parseInt(req.params.pageNumber, 10) || 1;

        if (isNaN(genreId) || genreId < 1) {
            genreId = 1;
        }

        if (isNaN(currentPage) || currentPage < 1) {
            currentPage = 1;
        }

        try {
            const result = await siteService.getListManga(currentPage, HANDLE_CODE.NUM_OF_ITEM_PER_PAGE);
            res.json(result);
        } catch (err) {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch list manga by genre' });
        }
    }

    // [GET] /manga/{id}
    async getManga(req, res){
        let mangaId = parseInt(req.params.id, 10) || 1;

        if (isNaN(mangaId) || mangaId < 1) {
            currentPage = 1;
        }

        try {
            const result = await siteService.getManga(mangaId);
            if (result && result.manga && result.manga.length > 0) {
                res.json(result);
            } else {
                res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Manga not found' });
            }
        } catch (err) {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Failed to get manga' });
        }
    }

    // [GET] /chapter/{id}
    async getChapter(req, res){
        let chapterId = parseInt(req.params.id, 10) || 1;

        if (isNaN(chapterId) || chapterId < 1) {
            chapterId = 1;
        }

        try {
            const result = await siteService.getManga(mangaId);
            if (result && result.manga && result.manga.length > 0) {
                res.json(result);
            } else {
                res.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Manga not found' });
            }
        } catch (err) {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Failed to get manga' });
        }
    }
}

module.exports = new SiteController;
