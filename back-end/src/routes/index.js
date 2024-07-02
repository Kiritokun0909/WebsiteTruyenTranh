const homeRouter = require('./home.js')
const siteRouter = require('./site.js')

function route(app) {
    app.use('/home', homeRouter);
    app.use('/', siteRouter);
}

module.exports = route;
