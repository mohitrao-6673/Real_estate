const propertyModel = require("../../model/propertyModel")
const inquiryModel = require("../../model/inquiryModel")



// buyer send inquiries
let sendInquiry = async (req, res) => {
    try {
        let { propertyId, message } = req.body
        let property = await propertyModel.findById(propertyId).populate('seller')


        let inquiry = await inquiryModel.create({
            property: property._id,
            seller: property.seller._id,
            buyer: req.user.id,
            message
        })

        res.send({
            status: 1,
            message: 'Inquiry Sent Successfully',
            data: inquiry
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




// seller view inquiries
let getSellerInquiries = async (req, res) => {
    try {
        let inquiries = await inquiryModel.find({
            seller: req.user.id
        })
            .populate('buyer', 'firstName lastName email phone')
            .populate('property', 'title price images city')
            .sort({ createdAt: -1 })
        res.send({
            status: 1,
            count: inquiries.length,
            data: inquiries
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


//mark isRead
let markIsRead = async (req, res) => {
    try {
        let inquiry = await inquiryModel.findById(req.params.id)
        inquiry.isRead = true
        await inquiry.save()
        res.send({
            status: 1,
            message: 'read',
            data: inquiry
        })
        console.log(inquiry)
    }
    catch (error) {
        res.send({
            status: 0,
            message: error
        })
        console.log(error)
    }
}



module.exports = { sendInquiry, getSellerInquiries, markIsRead }