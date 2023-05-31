const mongoose = require('mongoose')
const CommentSchema = new mongoose.Schema({
    postId : {
        type : String,
        
    },
    userId : {
        type : String,

    },
    content : {
        type : String,
    },

} , {timestamps : true})
const CommentModel = mongoose.model('Comments' , CommentSchema)
module.exports = CommentModel;