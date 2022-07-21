const path = require('path')
const express = require('express')
const compression = require('compression')
const next = require('next')
const helmet = require('helmet')
const routes = require('./routes')

const APP_ROUTES = require('../../app.router.json');
const port = parseInt(process.env.PORT, 3100) || 8111

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = routes.getRequestHandler(app)

app.prepare().then(() => {
    const server = express()

    server.use(helmet())
    server.use(compression())

    const staticPath = path.join(__dirname, '../static')
    server.use('/static', express.static(staticPath, {
        maxAge: '30d',
        immutable: true
    }))

    // San pham
    server.get("/:cate/:name-i:id(\\d+)", (req, res) => {
        return app.render(req, res, "/product", { ...req.params })
    })

    // http://localhost:3100/java-spring-cau-hinh-repos-m14
    server.get("/:name-m:id(\\d+)", (req, res) => {
        return app.render(req, res, "/category", { c: req.params.id })
    })

    // Danh muc tin tuc
    server.get("/:name-p:id(\\d+)", (req, res) => {
        return app.render(req, res, "/page-category", { id: req.params.id })
    })

    // Trang tin tuc
    server.get("/:cate/:name-v:id(\\d+)", (req, res) => {
        return app.render(req, res, "/page-view", { id: req.params.id })
    })

    // Lĩnh vực
    server.get("/:name-d:id(\\d+)", (req, res) => {
        return app.render(req, res, "/linh-vuc", { id: req.params.id })
    })

    // Thiết kế view
    server.get("/thiet-ke/:name-k:id(\\d+)", (req, res) => {
        return app.render(req, res, "/thiet-ke/view", { ...req.params })
    })

    server.get("/thiet-ke/gui-yeu-cau", (req, res) => {
        return app.render(req, res, "/thiet-ke/gui-yeu-cau", {...req.query})
    })

    // In nhanh
    server.get("/in-nhanh/:combo-id:id(\\d+)", (req, res) => {
        return app.render(req, res, "/in-nhanh/combo", { ...req.params })
    })

    // Đặt in từ đơn thiết kế
    server.get("/customer-order/dat-in-don-thiet-ke-:code", (req, res) => {
        return app.render(req, res, "/customer-order/print-from-design", { ...req.params })
    })

    APP_ROUTES.user.forEach( ({is_auth_require, pattern, regex}) => 
        server.get( pattern + (regex ? "/" + regex : ""), (req, res) => {
            if(is_auth_require) {
                res.status(301).redirect('/login?redirect=' + req.originalUrl);
            }
            return app.render(req, res, pattern, { ...req.params });
        })
    )

    server.get('*', (req, res) => {
        return handler(req, res)
    })

    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`)
    })
})