let mongoose = require('mongoose')

let contactSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    message: {
        type: String,
    },
    role: {
        enum: ['buyer', 'seller'],
        type: String,
    },
},
    {
        timestamps: true
    }
)



let contactModel = mongoose.model('contact', contactSchema)
module.exports = contactModel



