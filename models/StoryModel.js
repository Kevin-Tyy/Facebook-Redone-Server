const mongoose = require('mongoose')
const StorySchema = new mongoose.Schema({
    creatorId : {
        type : String,
        required : true
    },
    storyId : {
        type : String,
        required : true
    },
    storyMedia : {
        type : String,
        required : true
    },
    stortCaption : {
        type : String,
        trim : true
    }
} , {timestamps : true})

StorySchema.index({ createdAt: 1 }, { expireAfterSeconds: 100 });

const StoryModel = mongoose.model("Story" , StorySchema);
module.exports = StoryModel;