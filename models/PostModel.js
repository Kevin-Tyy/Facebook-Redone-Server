const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    creatorId : {
        type : String,
        required : true    
    },
    postId : {
        type : String,
        trim : true,
        reqruired : true
    },
    postMedia : {
        type : String,
        trim : true
    },
    postText : {
        type : String,
        required : true,
        trim : true
    },
    taggedpeople : {
        type : [String],
    },
    likedPeople : {
        type : [String],
    },
    

}, {timestamps : true})
const PostModel = mongoose.model('Posts' , PostSchema);
module.exports = PostModel;
