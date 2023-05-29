const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        trim : true,
        lowercase : true,
        unique : true
    },
    email : {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password : {
        type: String,
        required: true,
        trim: true,
    },
    profileImage : {
        type: String,
        trim: true,
    }
} , {timestamps : true})

const UserModel = mongoose.model("Users" , UserSchema);

module.exports = UserModel;