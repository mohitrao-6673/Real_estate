let express = require('express')
const { checkUserLogin } = require("../../middleware/checkUserLogin")
const { sendInquiry, getSellerInquiries, markIsRead } = require('../../controller/web/inquiryController')
let inquiryRoutes = express.Router()

inquiryRoutes.post('/send', checkUserLogin, sendInquiry)

inquiryRoutes.get('/view', checkUserLogin, getSellerInquiries)

inquiryRoutes.post('/read/:id', markIsRead)

module.exports = inquiryRoutes