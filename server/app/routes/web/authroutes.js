let express = require("express")
const { register, login, changePassword, verification, forGotPassword, verifyResetPasswordCode, changePasswordAfterLogin, getProfile } = require("../../controller/web/userAuthController")
const { checkUserLogin } = require("../../middleware/checkUserLogin")
let authRoutes = express.Router()





authRoutes.post('/veryemail', verification)
authRoutes.post('/register', register)
authRoutes.post('/login', login)
authRoutes.post('/forgot-password', forGotPassword)
authRoutes.post('/changepassword/:token', changePassword)
authRoutes.post('/changepassword-after-login', checkUserLogin, changePasswordAfterLogin)
// authRoutes.get('/get-profile', checkUserLogin, getProfile)

module.exports = authRoutes
