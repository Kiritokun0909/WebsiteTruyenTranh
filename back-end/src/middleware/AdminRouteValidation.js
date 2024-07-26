module.exports.validUploadMangaBody = (req, res, next) => {
    const { mangaName, author, ageLimit, description } = req.body;
    
    if (!mangaName || !author || !ageLimit || !description) {
        return res.status(400).json({ 
            success: false, 
            message: 'mangaName, author, ageLimit, description are required.' 
        });
    }
    
    next();
};

module.exports.validUploadChapterBody = (req, res, next) => {
    const { chapterName } = req.body;
    
    if (!chapterName) {
        return res.status(400).json({ 
            success: false, 
            message: 'chapterName is required.' 
        });
    }
    
    next();
};