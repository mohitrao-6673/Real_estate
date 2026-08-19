let mongoose = require('mongoose')

let teamSchema = mongoose.Schema({
    memberName: {
        type: String,
        required: true,
    },
    memberCategory: {
        type: String,
        required: true,
    },
    memberImage: {
        type: String
    },
    status: {
        type: Boolean,
        required: true,
    }
},
    {
        timestamps: true
    }
)

let teamModel = mongoose.model('team', teamSchema)
module.exports = teamModel