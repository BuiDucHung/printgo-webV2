const APP_ROUTES = require('../app.router');
const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()

APP_ROUTES.name.forEach((route) => routes.add(route))