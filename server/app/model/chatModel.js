let mongoose = require('mongoose');

let messageSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    text: {
        type: String,
    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

let chatSchema = mongoose.Schema({
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'property',
        required: false
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    messages: [messageSchema]
}, {
    timestamps: true
})


let chatModel = mongoose.model('chat', chatSchema)
module.exports = chatModel