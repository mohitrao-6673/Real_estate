let express = require('express')
const { getAllUser, userDelete, userBlock } = require('../../controller/admin/userController')
const { checkUserLogin } = require("../../middleware/checkUserLogin")
let userRoutes = express.Router()


userRoutes.get('/view', checkUserLogin, getAllUser)

userRoutes.delete('/delete/:id', checkUserLogin, userDelete)

userRoutes.post('/block/:id', userBlock)

module.exports = userRoutes