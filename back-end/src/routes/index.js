const adminRoute = require('./admin.js');
const translatorRoute = require('./translator.js');
const userRoute = require('./user.js');
const accountRoute = require('./account.js');
const siteRouter = require('./site.js');

function route(app) {
    app.use('/admin', adminRoute);
    app.use('/translator', translatorRoute);
    app.use('/user', userRoute);
    app.use('/account', accountRoute);
    app.use('/', siteRouter);
}

module.exports = route;
