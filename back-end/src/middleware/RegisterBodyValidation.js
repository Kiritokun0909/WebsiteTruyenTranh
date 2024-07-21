module.exports.validRegisterBody = (req, res, next) => {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: 'Username, email, and password are required' });
    }
    
    next();
};

module.exports.validLoginBody = (req, res, next) => {
    const {email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email, and password are required' });
    }
    
    next();
};