let express = require("express")
const { checkUserLogin } = require("../../middleware/checkUserLogin")
const multer = require("multer")
const { creatContact, getAllContact, contactDelete } = require("../../controller/web/contactController")
let contactRoutes = express.Router()


// let uploads = multer({ storage: '' }).none()


contactRoutes.post('/send', checkUserLogin, creatContact)

contactRoutes.get('/view', checkUserLogin, getAllContact)

contactRoutes.delete('/delete/:id', checkUserLogin, contactDelete)


module.exports = contactRoutes