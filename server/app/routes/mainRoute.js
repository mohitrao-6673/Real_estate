let express = require("express")
const adminRoutes = require("./admin/adminRoutes")
const webRoutes = require("./web/webRoutes")
let mainRoute = express.Router()

mainRoute.use('/admin', adminRoutes)

mainRoute.use('/web', webRoutes)

module.exports = mainRoute