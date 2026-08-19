const userModel = require("../../model/userModel")



// get all the users
let getAllUser = async (req, res) => {
    try {
        let user = await userModel.find().select("-password")
        res.send({
            status: 1,
            message: 'all users',
            data: user
        })
    }
    catch (error) {
        res.send({
            status: 0,
            message: error
        })
        console.log(error)
    }
}


///user delete
let userDelete = async (req, res) => {
    try {

        let user = await userModel.deleteOne({ _id: req.params.id })
        res.send({
            status: 1,
            message: 'User Deleted Successfully',
            data: user
        })

    }
    catch (error) {
        res.send({
            status: 0,
            message: 'error', error
        })
    }
}


///user blocked
let userBlock = async (req, res) => {
    try {

        let user = await userModel.findById(req.params.id)
        user.isBlocked = !user.isBlocked
        await user.save()
        res.send({
            status: 1,
            message: user.isBlocked ? 'User Block' : 'User Unblock',
            data: user.isBlocked
        })

    }
    catch (error) {
        res.send({
            status: 0,
            message: 'error', error
        })
    }
}


module.exports = { getAllUser, userDelete, userBlock }