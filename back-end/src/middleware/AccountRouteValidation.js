module.exports.validUpdatePasswordBody = (req, res, next) => {
    const { newPassword } = req.body;
    
    if (!newPassword) {
        return res.status(400).json({ success: false, message: 'newPassword is required.' });
    }
    
    next();
};

module.exports.validUpdateUsernameBody = (req, res, next) => {
    const { newUsername } = req.body;
    
    if (!newUsername) {
        return res.status(400).json({ success: false, message: 'newUsername is required.' });
    }
    
    next();
};

module.exports.validCommentBody = (req, res, next) => {
    const { context } = req.body;
    
    if (!context) {
        return res.status(400).json({ success: false, message: 'context is required.' });
    }
    
    next();
};