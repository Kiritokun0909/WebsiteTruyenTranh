const accountService = require('../services/AccountService.js');
const HANDLE_CODE = require('../../configs/HandleCode.js');

class AccountController {
    // [GET] /account/index
    async index(req, res) {
        res.send('Hello index');
    }

    // [POST] /account/update-username
    async updateUsername(req, res) {
        const accountId  = req.user.id;
        const { newUsername } = req.body;
        try {
            const result = await accountService.updateUsername(accountId, newUsername);

            if(result && result.code == accountService.UPDATE_SUCCESS_CODE) {
                res.status(200).json({ message: result.message });
                return;
            }

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Failed to update username.' });
        }
    }

    // [POST] /account/update-password
    async changePassword(req, res) {
        const accountId  = req.user.id;
        const { newPassword } = req.body;
        try {
            const result = await accountService.changePassword(accountId, newPassword);

            if(result && result.code == accountService.UPDATE_SUCCESS_CODE) {
                res.status(200).json({ message: result.message });
                return;
            }

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Failed to update password.' });
        }
    }

    // [POST] /account/like-manga/{mangaId}
    async like(req, res) {
        const accountId  = req.user.id;
        const mangaId = parseInt(req.params.mangaId, 10);

        if (isNaN(mangaId) || mangaId < 1) {
            res.status(400).json({ error: 'Invalid MangaId' });
            return;
        }

        try {
            const result = await accountService.likeManga(accountId, mangaId);

            if(result && result.code == accountService.FAILED_CODE) {
                res.status(400).json({ message: result.message });
                return;
            }
            
            if(result && result.code == accountService.SUCCESS_CODE) {
                res.status(200).json({ message: result.message });
                return;
            }

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Failed to like manga.' });
        }
    }

    // [POST] /account/follow-manga/{mangaId}
    async follow(req, res) {
        const accountId  = req.user.id;
        const mangaId = parseInt(req.params.mangaId, 10);

        if (isNaN(mangaId) || mangaId < 1) {
            res.status(400).json({ error: 'Invalid MangaId' });
            return;
        }

        try {
            const result = await accountService.followManga(accountId, mangaId);

            if(result && result.code == accountService.FAILED_CODE) {
                res.status(400).json({ message: result.message });
                return;
            }
            
            if(result && result.code == accountService.SUCCESS_CODE) {
                res.status(200).json({ message: result.message });
                return;
            }

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Failed to follow manga.' });
        }
    }

    // [POST] /account/unlike-manga/{mangaId}
    async unlike(req, res) {
        const accountId  = req.user.id;
        const mangaId = parseInt(req.params.mangaId, 10);

        if (isNaN(mangaId) || mangaId < 1) {
            res.status(400).json({ error: 'Invalid MangaId' });
            return;
        }

        try {
            const result = await accountService.unlikeManga(accountId, mangaId);
            
            if(result && result.code == accountService.SUCCESS_CODE) {
                res.status(200).json({ message: result.message });
                return;
            }

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Failed to like manga.' });
        }
    }

    // [POST] /account/unfollow-manga/{mangaId}
    async unfollow(req, res) {
        const accountId  = req.user.id;
        const mangaId = parseInt(req.params.mangaId, 10);

        if (isNaN(mangaId) || mangaId < 1) {
            res.status(400).json({ error: 'Invalid MangaId' });
            return;
        }

        try {
            const result = await accountService.unfollowManga(accountId, mangaId);
            
            if(result && result.code == accountService.SUCCESS_CODE) {
                res.status(200).json({ message: result.message });
                return;
            }

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Failed to like manga.' });
        }
    }

    // [GET] /account/like-list/pageNumber={pageNumber}
    async getListLike(req, res){
        const accountId  = req.user.id;
        let currentPage = parseInt(req.params.pageNumber, 10) || 1;
        
        if (isNaN(currentPage) || currentPage < 1) {
            res.status(400).json({ error: 'Invalid PageNumber' });
            return;
        }

        try {
            const result = await accountService.getListLike(accountId, currentPage, HANDLE_CODE.NUM_OF_ITEM_PER_PAGE);
            res.json(result);
            return;
        } catch (err) { }
        res.status(500).json({ error: 'Failed to get like list' });
    }
    
    // [GET] /account/follow-list/pageNumber={pageNumber}
    async getListFollow(req, res){
        const accountId  = req.user.id;
        let currentPage = parseInt(req.params.pageNumber, 10) || 1;
        
        if (isNaN(currentPage) || currentPage < 1) {
            res.status(400).json({ error: 'Invalid PageNumber' });
            return;
        }

        try {
            const result = await accountService.getListFollow(accountId, currentPage, HANDLE_CODE.NUM_OF_ITEM_PER_PAGE);
            res.json(result);
            return;
        } catch (err) { }
        res.status(500).json({ error: 'Failed to get like list' });
    }

}

module.exports = new AccountController;