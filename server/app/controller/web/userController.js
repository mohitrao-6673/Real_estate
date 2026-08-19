const userModel = require("../../model/userModel")
let fs = require('fs')


// get profile 
let getProfile = async (req, res) => {
    try {
        let user = await userModel.findById(req.user.id).select('-password')

        res.send({
            status: 1,
            message: 'user found',
            data: user,
            staticpath: 'uploads/user/'
        })

    }
    catch (error) {
        res.send({
            status: 0,
            message: 'user not found', error
        })
        console.log(error)
    }

}



// get public profile 
let getPublicProfile = async (req, res) => {
    try {
        let user = await userModel.findById(req.params.id).select('firstName lastName role createdAt profilePic')

        if (!user) {
            res.send({
                status: 0,
                message: 'user not found'
            })
        }
        res.send({
            status: 1,
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



// update profile 
let updateProfile = async (req, res) => {
    try {
        let { firstName, phone, lastName, email, removeProfilePic } = req.body
        let user = await userModel.findById(req.user.id)


        let getImageName = await userModel.findOne({ _id: req.user.id })
        if (getImageName.profilePic) {
            let imageName = getImageName.profilePic
            let path = `uploads/user/${imageName}`
            fs.unlinkSync(path)
        }

        // IMAGE HANDLIng
        if (req.file) {
            if (req.file.filename) {
                user.profilePic = req.file.filename
            }
        }
        else if (removeProfilePic == 'true') {
            user.profilePic = null
        }
        user.firstName = firstName
        user.phone = phone
        user.lastName = lastName
        user.email = email
        await user.save()

        res.send({
            status: 1,
            message: 'Profile Successfully Updated ',
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







module.exports = { getProfile, getPublicProfile, updateProfile }