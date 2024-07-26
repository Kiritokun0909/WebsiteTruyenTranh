const adminRoute = require('./admin.js');
const accountRoute = require('./account.js');
const authRoute = require('./auth.js');
const siteRouter = require('./site.js');

const authService = require('../app/services/AuthService.js');
const { verifyToken, authorizeRole } =  require('../middleware/jwt.js');

function route(app) {
    app.use('/auth', authRoute);
    app.use('/account', verifyToken, accountRoute);
    app.use('/admin', verifyToken, authorizeRole(authService.RoleEnum.ADMIN), adminRoute);
    app.use('/', siteRouter);
}

module.exports = route;
