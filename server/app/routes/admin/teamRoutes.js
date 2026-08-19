let express = require("express")
const { teamInsert, teamView, teamDelete, teamEdit, teamUpdate, teamMultipleDelete } = require("../../controller/admin/teamController")
const multer = require("multer")


let teamRoute = express.Router()


let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/team')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

let uploads = multer({ storage: storage }).single('memberImage')


teamRoute.post('/insert', uploads, teamInsert)
//http://localhost:8040/admin/team/insert


teamRoute.get('/view', teamView)
//http://localhost:8040/admin/team/view


teamRoute.post('/delete/:id', teamDelete)
//http://localhost:8040/admin/team/delete


teamRoute.post('/muldelete', teamMultipleDelete)
//http://localhost:8040/admin/team/muldelete


teamRoute.post('/edit/:id', teamEdit)
//http://localhost:8040/admin/team/edit


teamRoute.put('/update/:id', uploads, teamUpdate)
// // //http://localhost:8040/admin/team/update



module.exports = teamRoute 