
let mongoose = require('mongoose');

let inquirySchema = mongoose.Schema({
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'property',
        required: true
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})


let inquiryModel = mongoose.model('inquiry', inquirySchema)
module.exports = inquiryModel