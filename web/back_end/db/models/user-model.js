const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required : [true, "This field cannot be empty "]
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required : [true, "This field cannot be empty "],
        index: true,
        validate: [isEmail, "invalid email"]
    },
    password: {
        type: String,
        required : [true, "This field cannot be empty "]
    }
}, {minimize:false});

UserSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

UserSchema.statics.findByEmail = async function(email){
    const user = await User.findOne({email: email});
    if(!user) throw new Error("invalid email");
    // if any throws an error it does not return
    return user
}


const User = mongoose.model("users", UserSchema);
module.exports = User