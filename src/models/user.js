const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minLength : 4,
        maxLength : 50,
    },
    lastName : {
        type : String
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    age : {
        type : String,
        min : 18
    },
    gender : {
        type : String,
        validate(value) {
            if(!["male","female","other"].includes(value)) {
                throw new Error("Gender data is not valid.");
            }

        }
    },
    photoUrl : {
        type : String
    },
    about : {
        type : String,
        default : "This is the default about of the user"
    },
    skills : {
        type : [String],
        enum : ["Java", "Python"]
    }
},
{
    timestamps : true
})

// this keyword is used for accesing the instances of file.
// and, when we create a new user then we create new instance of an user.
userSchema.methods.getJWT = async function () {
    const user = this;
    const jwtToken = await jwt.sign({_id : user._id}, "mudit@123", {expiresIn : '1d'});
    return jwtToken;
}


userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
}

const userModel = mongoose.model("User",userSchema);

module.exports = userModel;

