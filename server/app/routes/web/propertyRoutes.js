let express = require("express")
const { getSingleProperty, getAllProperty } = require("../../controller/web/property")
let propertyRoutes = express.Router()


propertyRoutes.post('/view', getAllProperty)

propertyRoutes.post('/singleview/:id', getSingleProperty)




module.exports = propertyRoutes