const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const homeController = require('../app/http/controllers/homeController')

function initRoutes(app) {

    homeController().index

    app.get('/', homeController().index)
    app.get('/login', authController().login)
    app.get('/register', authController().register)

    app.get('/cart', cartController().index)
    app.post('/update_cart', cartController().update)

}

module.exports = initRoutes