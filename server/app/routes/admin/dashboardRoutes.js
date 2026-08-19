let express = require('express')
const { getDashboardStats } = require('../../controller/admin/dashboardController')
const { checkUserLogin } = require("../../middleware/checkUserLogin")
let dashboardRoutes = express.Router()

dashboardRoutes.get('/view-stats', checkUserLogin,  getDashboardStats)

module.exports = dashboardRoutes