const express = require("express");
const app = express();
const PORT = 8000;
const bcrypt = require("bcrypt");
const connectDB = require("./config/database");
const User = require("./models/user");
const validateSignUpData = require("./utils/validation.js");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const authValidation = require("./middlewares/auth.js")


// Below one middle ware is used to convert the req body into json format. That't we use this.
app.use(express.json());

// This parser is used for reading a cookie token from the reqest body.
app.use(cookieParser());


//Get users by email.
app.get("/feed", async (req, res) => {
    try {
        const data = await User.find({email : req.body.email});
        if(data.length === 0) {
            res.status(400).send("User not found");
        }
        else {
            res.send(data);
        }    
    }
    catch(err) {
        res.status(400).send("Data not found");
    }
})


app.get("/feedAllData", async (req, res) => {
    try {
        const data = await User.find({});
        res.send(data);
    }
    catch(err) {
        res.send("Collection is empty. There is not document.");
    }
})



// Delete data from the database
app.delete("/delete", async (req, res) => {
    // const userId = req.body.userId;
    try {
        // const data = await User.findByIdAndDelete({_id : userId}); //both works fine in this case.
        // This works only for the delete.
        const data = await User.findByIdAndDelete(userId);

        if(data){
            res.send("userDetails is delete succesfully");
        }
        else {
            res.status(400).send("UserData is not present in the document.")
        }
    }
    catch(err) {
        res.status(400).send(err.message);
    }
})



//updating the data :-
app.patch("/update", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body; // This will return the data which we will pass from the postman fou updation.
    try {
        const updatedData = await User.findByIdAndUpdate({_id : userId}, data,  {
            returnOriginal: "after",
            runValidators : true
        });   
        if(Object.keys(data).includes("email", "password")) {
            throw new Error("Data is not valid");
        }
        res.send("Data is updated successfully");
    }
    catch(err) {
        res.status(400).send(err.message);
    }
})



// Creating the new instance of an User Model. 
app.post("/signup", async (req, res) => {
    // Validation of data is very important.
    try {
        validateSignUpData(req);

        //Encrypt the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;

        const user = new User(req.body);

        await user.save();
        res.send("user added succesfully");
    }
    catch(err) {
        // res.status(400).send(`Error saving the user: ${err.message}`);
        res.status(400).send(err.message);
    }
})


app.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({email : req.body.email});

        if(!user){
            throw new Error("Invalid Credentials");
        }

        const dbStoredPassword = user.password;
        const isPasswordValid = await bcrypt.compare(req.body.password, dbStoredPassword); //compare method return true or false
        if(isPasswordValid) { 
            const jwtToken = await jwt.sign({_id : user._id}, "mudit@123");
            res.cookie("token" , jwtToken);
            res.send("JWT Token is generated succesfully");
        }
        else {
            throw new Error("Invalid Credentials");
        }
    }
    catch(err) {
        res.status(400).send(err.message);
    }
})


// If we get any error in authValidation function then wo wahi error ko return kardega . code aage execute nhi hoga.
// means next handle run nahi hoga jo .get ("/profile") main likha hai.
// authValidation is act as middle one for 
app.get("/profile", authValidation, async (req, res) => {
    try {
        res.send(req.user);
    }
    catch(err) {
        res.status(400).send(err.message);
    }
})


app.use("/",(req, res) => {
    res.send("There is some issue in our code");
});

connectDB()
.then(()=>{
    console.log("Database successfully Connected");
    app.listen(PORT,()=>{
        console.log(`Server is running on port number ${PORT}`);
    })
}).catch((err) => {
    console.log("Not connected successfully: "+ err.message);
})