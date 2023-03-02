const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    username:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    country:{
        type:String,
        trim:true,
        required:true,
    },
    currency:{
        type:String,
        trim:true,
        required:true,
    },
    wallet:{
        type:String,
        trim:true,
        required:true,
    },
    password:{
        type:String,
        trim:true,
        required:true,
    },
    profile:{
        type:String,
        default:'avatar.png',
    },

});

export default mongoose.models.User || mongoose.model('User', UserSchema);