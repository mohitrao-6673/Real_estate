let mongoose = require('mongoose')

let propretSchema = mongoose.Schema({
    title: {
        type: String,
        required: false,
    },
    description: {
        type: String,
    },
    images: [{
        type: String,
    }],
    propertyType: {
        type: String,
        required: false,
    },
    furnishing: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: false,
    },
    bhk: {
        type: Number,
        required: false,
    },
    bathrooms: {
        type: Number,
        required: false,
    },
    areaSize: {
        type: Number,
        required: false,
    },
    price: {
        type: Number,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    area: {
        type: String,
        required: false,
    },
    pincode: {
        type: String,
        required: false,
    },
    ameneties: [{
        type: String,
    }],
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
},
    {
        timestamps: true
    }
)


let propertyModel = mongoose.model('property', propretSchema)
module.exports = propertyModel