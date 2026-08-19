const teamModel = require("../../model/teamModel")
let fs = require('fs')



// team-insert
let teamInsert = async (req, res) => {

    let insertObj = {
        memberName: req.body.memberName,
        memberCategory: req.body.memberCategory,
        status: req.body.status
    }

    if (req.file) {
        if (req.file.filename) {
            insertObj['memberImage'] = req.file.filename
        }
    }

    try {
        let teamInsert = new teamModel(insertObj)
        let data = await teamInsert.save()
        let obj = {
            status: 1,
            message: 'Member Added Successfully',
            data
        }
        res.send(obj)
    }
    catch (error) {
        let obj = {
            status: 0,
            message: 'This Entry Is Already Exist',
            error
        }
        res.send(obj)
    }

}



// team-view
let teamView = async (req, res) => {

    let teamData = await teamModel.find()
    //console.log(teamData)
    let obj = {
        status: 1,
        message: 'View Data',
        staticPath: 'uploads/team/',
        data: teamData
    }
    res.send(obj)

}


// single-delete
let teamDelete = async (req, res) => {
    let { id } = req.params


    // image delete in folder

    let getImageName = await teamModel.findOne({ _id: id })
    if (getImageName.memberImage) {
        let imageName = getImageName.memberImage
        let path = `uploads/team/${imageName}`
        fs.unlinkSync(path)
    }


    // data delete in database
    let memberDelete = await teamModel.deleteOne({ _id: id })
    let obj = {
        status: 1,
        message: 'Member Deleted Successfully',
        memberDelete
    }

    res.send(obj)
}



// multiple-deleted
let teamMultipleDelete = async (req, res) => {
    let { allIds } = req.body

    // delete-image-in-main-folder
    let getAllImages = await teamModel.find({ _id: { $in: allIds } }).select('memberImage')


    for (let images of getAllImages) {
        if (images.memberImage) {
            let imageName = images.memberImage
            let path = `uploads/team/${imageName}`
            fs.unlinkSync(path)
        }
    }

    // delete-entry-in-database
    let teamDelete = await teamModel.deleteMany({ _id: { $in: allIds } })
    let obj = {
        status: 1,
        message: 'Team Members Deleted Successfully',
        teamDelete
    }
    res.send(obj)
}




// team-edit
let teamEdit = async (req, res) => {
    let { id } = req.params
    let data = await teamModel.findOne({ _id: id })
    let obj = {
        status: 1,
        message: ' team Edit',
        staticPath: 'uploads/team/',
        data
    }
    res.send(obj)
}




// // team-update
let teamUpdate = async (req, res) => {
    let { id } = req.params
    let product = await teamModel.findById(id).select('memberImage')
    let updatedObj = {
        memberName: req.body.memberName,
        memberCategory: req.body.memberCategory,
        status: req.body.status
    }


    if (product.memberImage) {
        let path = `uploads/team/${product.memberImage}`
        fs.unlink(path, (err) => {
            if (err) console.error('Failed to delete old file:', err);
        });
    }


    if (req.file) {
        if (req.file.filename) {
            updatedObj['memberImage'] = req.file.filename
        }
    }

    try {
        let propertyUpdate = await teamModel.updateOne({ _id: id }, { $set: updatedObj })

        let obj = {
            status: 1,
            message: 'Member Updated Successfully',
            data: propertyUpdate
        }
        res.send(obj)
    }
    catch (error) {
        let obj = {
            status: 0,
            message: 'This Entry Is Already Exist',
            error
        }
        res.send(obj)
    }
}






module.exports = { teamInsert, teamView, teamDelete, teamEdit, teamUpdate, teamMultipleDelete }