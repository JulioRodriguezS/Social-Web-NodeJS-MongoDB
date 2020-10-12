const { mongo } = require('mongoose')
const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const commentSchema = new mongoose.Schema({
    imageId:{
        type: ObjectId
    },
    gravatar:{
        type: String
    },
    name:{
        type:String
    },
    email:{
        type:String
    },
    comment:{
        type:String
    },
    savedDate:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Comment', commentSchema)