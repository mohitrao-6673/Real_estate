let express = require("express")
const propertyRoutes = require("./propertyRoutes")
const teamRoute = require("./teamRoutes")
const userRoutes = require("./userRoutes")
const dashboardRoutes = require("./dashboardRoutes")
let adminRoutes = express.Router()


adminRoutes.use('/property', propertyRoutes)

adminRoutes.use('/team', teamRoute)

adminRoutes.use('/user', userRoutes)

adminRoutes.use('/dashboard', dashboardRoutes)


module.exports = adminRoutes