const mongoose = require("mongoose");

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

const userModel = mongoose.model("User",userSchema);

module.exports = userModel;

