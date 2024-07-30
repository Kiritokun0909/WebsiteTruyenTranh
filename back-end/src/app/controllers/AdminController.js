const { uploadImage } = require("../services/UploadFirebaseService.js");
const adminService = require('../services/AdminService.js');

class AdminController {
    // [POST] /admin/upload-manga
    async uploadManga(req, res) {
        try {
            const accountId  = req.user.id;
            const { mangaName, author, ageLimit, description, selectedGenres } = req.body;
            
            const coverImage = req.file;
            const folderName = `manga_cover_images/${mangaName}`;
            const filename = `${Date.now()}-${coverImage.originalname}`;

            const coverImageUrl = await uploadImage(coverImage.buffer, folderName, filename, coverImage.mimetype);

            const result = await adminService.addManga(mangaName, author, coverImageUrl, description, ageLimit, selectedGenres, accountId);

            if(result && result.code == adminService.SUCCESS_CODE) {
                res.status(201).json({ message: result.message });
                return;
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to add manga." });
        }
    }

    // [PUT] /admin/update-manga
    async updateManga (req, res) {
        try {
            const { mangaId, mangaName, author, ageLimit, description, selectedGenres } = req.body;
            let coverImageUrl = '';
    
            // Check if a new cover image is uploaded
            if (req.file) {
                const coverImage = req.file;
                const folderName = `manga_cover_images/${mangaId}`;
                const filename = `${Date.now()}-${coverImage.originalname}`;

                coverImageUrl = await uploadImage(coverImage.buffer, folderName, filename, coverImage.mimetype);
            }
            else {
                console.log('No file upload.');
            }
    
            const result = await adminService.updateManga(mangaId, mangaName, author, coverImageUrl, description, ageLimit, selectedGenres);
            if(result && result.code == adminService.SUCCESS_CODE) {
                res.status(200).json({ message: result.message });
                return;
            }
        } catch (err) {
            console.error('Error updating manga:', err);
            res.status(500).json({ message: 'Failed to update manga.' });
        }
    }
    

    // [DELETE] /admin/remove-manga/{mangaId}
    async removeManga(req, res) {
        const mangaId = parseInt(req.params.mangaId, 10);

        if (isNaN(mangaId) || mangaId < 1) {
            res.status(400).json({ error: 'Invalid MangaId' });
            return;
        }

        try {
            const result = await adminService.removeManga(mangaId);
            if(result && result.code == adminService.SUCCESS_CODE) {
                res.status(200).json({ message: result.message });
                return;
            }

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to delete manga." });
        }
    }

    // [PUT] /admin/hide-manga/{mangaId}
    async hideManga(req, res) {
        const mangaId = parseInt(req.params.mangaId, 10);

        if (isNaN(mangaId) || mangaId < 1) {
            res.status(400).json({ error: 'Invalid MangaId' });
            return;
        }

        try {
            const result = await adminService.setMangaHideStatus(mangaId, true);
            if(result && result.code == adminService.SUCCESS_CODE) {
                res.status(200).json({ message: result.message });
                return;
            }
            
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to hide manga." });
        }
    }

    // [PUT] /admin/unhide-manga/{mangaId}
    async unhideManga(req, res) {
        const mangaId = parseInt(req.params.mangaId, 10);

        if (isNaN(mangaId) || mangaId < 1) {
            res.status(400).json({ error: 'Invalid MangaId' });
            return;
        }

        try {
            const result = await adminService.setMangaHideStatus(mangaId, false);
            if(result && result.code == adminService.SUCCESS_CODE) {
                res.status(200).json({ message: result.message });
                return;
            }
            
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to unhide manga." });
        }
    }

    // [POST] /admin/upload-chapter/{mangaId}
    async uploadChapter(req, res) {
        const mangaId = parseInt(req.params.mangaId, 10);
        const { chapterName } = req.body;

        if (isNaN(mangaId) || mangaId < 1) {
            res.status(400).json({ error: 'Invalid MangaId' });
            return;
        }

        try {
            let result = await adminService.addChapter(chapterName, mangaId);

            if(result && result.code == adminService.FAILED_CODE) {
                res.status(400).json({ message: result.message });
                return;
            }

            const listImage = [];
            for (let i = 0; i < req.files.length; i++) {
                const file = req.files[i];
                const folderName = `chapter_images/${mangaId}/${result.chapterId}`;
                const filename = `${Date.now()}-${file.originalname}`;

                const publicUrl = await uploadImage(
                    file.buffer,
                    folderName,
                    filename,
                    file.mimetype
                );
                listImage.push({ imageUrl: publicUrl, orderNumber: i + 1 });
            }

            result = await adminService.addChapterImages(listImage, result.chapterId);
            
            if(result && result.code == adminService.SUCCESS_CODE) {
                res.status(201).json({ message: result.message });
                return;
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to add new chapter." });
        }
    }
}

module.exports = new AdminController();
