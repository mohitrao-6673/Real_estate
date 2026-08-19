let express = require("express")
const { addProperty, propertyView, propetyDelete, propertyMultiDelete, propertyEdit, propertyUpdate, PropertyStatusChange } = require("../../controller/admin/property")
const { checkUserLogin } = require("../../middleware/checkUserLogin")
const multer = require("multer")
let propertyRoutes = express.Router()



let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/property')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

// // / Initialize multer for up to 5 images
// const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 } });
// // Endpoint to handle multiple images
// app.post('/upload-multiple', upload.array('images', 5), (req, res) => {
//     // req.files contains the array of files

// });


let uploads = multer({
    storage: storage,
}
).array('images', 10)



propertyRoutes.post('/add', uploads, checkUserLogin, addProperty)

propertyRoutes.get('/view', propertyView)

propertyRoutes.delete('/delete/:id', propetyDelete)

propertyRoutes.post('/muldelete', propertyMultiDelete)

propertyRoutes.post('/edit/:id', propertyEdit)

propertyRoutes.put('/update/:id', uploads, propertyUpdate)

propertyRoutes.post('/change-status/:id', PropertyStatusChange)

module.exports = propertyRoutes