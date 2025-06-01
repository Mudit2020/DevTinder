const validator = require("validator");


const validateSignUpData = (req) => {
    const {firstName, lastName, email, password} = req.body;

    if(!firstName || !lastName) { 
        throw new Error("Name can not be empty");
    }
    else if(!validator.isEmail(email)) {
        throw new Error("Email Id format is wrong.");
    }    
    else if(!validator.isStrongPassword(password)) {
        throw new Error("Password is not strong.");
    }
}

module.exports = validateSignUpData;