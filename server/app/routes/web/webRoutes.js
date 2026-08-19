let express = require("express")
const propertyRoutes = require("./propertyRoutes")
const authRoutes = require("./authroutes")
const userRoutes = require("./userRoutes")
const contactRoutes = require("./contactRoutes")
const inquiryRoutes = require("./inquiryRoutes")
const chatRoutes = require("./chatRoutes")
let webRoutes = express.Router()


webRoutes.use('/property', propertyRoutes)

webRoutes.use('/auth', authRoutes)

webRoutes.use('/user', userRoutes)

webRoutes.use('/contact', contactRoutes)

webRoutes.use('/inquiry', inquiryRoutes)

webRoutes.use('/chat', chatRoutes)


module.exports = webRoutes