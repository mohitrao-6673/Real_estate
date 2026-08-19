const propertyModel = require("../../model/propertyModel")
let fs = require('fs')
const path = require('path');

// property insert worked
let addProperty = async (req, res) => {

    let { title, description, price, city, area, pincode, propertyType, bhk, bathrooms, areaSize, furnishing, ameneties, status } = req.body

    let insertObj = {
        title,
        description,
        propertyType,
        price,
        city,
        area,
        pincode,
        bhk,
        bathrooms,
        areaSize,
        seller: req.user.id,
        furnishing,
        ameneties,
        status,
    }

    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'Please upload at least one image.' });
    }

    if (req.files) {
        let imagePaths = req.files.map((file) => `uploads/property/${file.filename}`)
        insertObj['images'] = imagePaths
    }

    //console.log(insertObj)
    try {
        let propertyInsert = new propertyModel(insertObj)
        let data = await propertyInsert.save()
        let obj = {
            status: 1,
            message: 'Property Added Successfully',
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

        console.log(error)
    }
}


// property display worked
let propertyView = async (req, res) => {

    let propertyData = await propertyModel.find()
    //console.log(teamData)
    let obj = {
        status: 1,
        message: 'View Your Property',
        staticPath: 'uploads/property/',
        data: propertyData
    }
    res.send(obj)

}



// single-delete
let propetyDelete = async (req, res) => {
    try {
        let { id } = req.params

        //    get images
        let getAllImages = await propertyModel.find({ _id: { $in: id } }).select('images')

        // delete images in folder
        for (allImages of getAllImages) {
            allImages.images.map((img) => {
                fs.unlinkSync(img)
            })
        }

        // data delete in database
        let deleteProperty = await propertyModel.deleteOne({ _id: id })
        let obj = {
            status: 1,
            message: 'Property Deleted Successfully',
            deleteProperty
        }

        res.send(obj)
    }
    catch (error) {
        res.send({
            status: 0,
            message: error
        })
        console.log(error)
    }


}


//property multiple delete
let propertyMultiDelete = async (req, res) => {
    let { allIds } = req.body
    let getAllImages = await propertyModel.find({ _id: { $in: allIds } }).select('images')

    // delete images in folder
    for (allImages of getAllImages) {
        allImages.images.map((img) => {
            fs.unlinkSync(img)
        })
    }


    // delete-entry-in-database
    let propertyDelete = await propertyModel.deleteMany({ _id: { $in: allIds } })
    let obj = {
        status: 1,
        message: 'Properties Deleted Successfully',
        propertyDelete
    }
    res.send(obj)


}



//property edit
let propertyEdit = async (req, res) => {
    let { id } = req.params
    let data = await propertyModel.findOne({ _id: { $in: id } })

    let obj = {
        status: 1,
        message: ' Property Edit',
        staticPath: 'uploads/property/',
        data
    }
    res.send(obj)
}




// property updated worked
let propertyUpdate = async (req, res) => {
    try {
        let { id } = req.params
        let property = await propertyModel.find({ _id: { $in: id } }).select('images')
        let { title, description, price, city, area, pincode, propertyType, bhk, bathrooms, areaSize, furnishing, ameneties, status } = req.body

        let updatedObj = {
            title,
            description,
            propertyType,
            price,
            city,
            area,
            pincode,
            bhk,
            bathrooms,
            areaSize,
            furnishing,
            ameneties,
            status,
        }
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }
        if (req.files) {
            let imagePaths = req.files.map((file) => `uploads/property/${file.filename}`)
            updatedObj['images'] = imagePaths
        }

        //delete images in folder
        for (allImages of property) {
            allImages.images.map((img) => {
                fs.unlinkSync(img)
            })
        }


        let propertyUpdate = await propertyModel.updateOne({ _id: id }, { $set: updatedObj })
        let obj = {
            status: 1,
            message: 'Property Updated Successfully',
            data: propertyUpdate
        }
        res.send(obj)

    }
    catch (error) {
        res.send({
            status: 0,
            message: error,
        })
        console.log(error)
    }
}



// prorty status change
let PropertyStatusChange = async (req, res) => {
    try {
        let { id } = req.params
        let { status } = req.body
        let property = await propertyModel.findById(id)

        property.status = status
        // let propertyUpdate = await propertyModel.updateOne({ _id: id }, { $set: property })
        await property.save()
        //console.log(property)
        res.send({
            status: 1,
            message: 'status change successfully',
            data: property
        })
    }
    catch (error) {
        res.send({
            status: 0,
            message: error,
        })
        console.log(error)
    }

}



module.exports = {
    addProperty,
    propertyView,
    propetyDelete,
    propertyMultiDelete,
    propertyEdit,
    propertyUpdate,
    PropertyStatusChange
}