const propertyModel = require("../../model/propertyModel")
const userModel = require("../../model/userModel")


// dashboard stats
let getDashboardStats = async (req, res) => {
    try {
        let totalProperties = await propertyModel.countDocuments()
        let activeListing = await propertyModel.countDocuments({
            status: "Sale"
        })

        let soldProperties = await propertyModel.countDocuments({
            status: "Sold"
        })

        let totalUsers = await userModel.countDocuments()

        res.send({
            status: 1,
            stats: {
                totalProperties,
                activeListing,
                soldProperties,
                totalUsers
            }
        })

    }
    catch (error) {
        res.send({
            status: 0,
            message: 'error', error
        })
        console.log(error)
    }
}

module.exports = { getDashboardStats }