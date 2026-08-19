let express = require("express")
const { checkUserLogin } = require("../../middleware/checkUserLogin")
const { getProfile, updateProfile, getPublicProfile } = require("../../controller/web/userController")
const multer = require("multer")

let userRoutes = express.Router()



let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/user')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
let uploads = multer({ storage: storage }).single('removeProfilePic')

userRoutes.get('/get-profile', checkUserLogin, getProfile)

userRoutes.get('/get-public-profile/:id', getPublicProfile)

userRoutes.put('/update-profile', uploads, checkUserLogin, updateProfile)


module.exports = userRoutes