const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authValidation = async (req, res, next) => {
    try{
        const {token} = req.cookies;
        if(!token){
            throw new Error("Invalid token");
        }

        //Validate my token.
        const decodedMessage = await jwt.verify(token, "mudit@123");
        const {_id} = decodedMessage;

        const userData = await User.findById(_id);

        //whatever we find from the database. we just add to the reuest.
        req.user = userData;

        if(!userData) {
            throw new Error("User not found");
        }
        next(); //It is used for calling an next handler.
    }
    catch(err) {
        res.status(404).send(err.message);
    }
}

module.exports = authValidation;



