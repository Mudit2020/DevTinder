const express = require("express");
const app = express();
const PORT = 8000;

const connectDB = require("./config/database");
const User = require("./models/user");

app.use(express.json());


//There are many functions which is used for fetching a data from the DB.
// .find({});
// .findOne({});
// .findById({});
 
// Below code is when data is present in DB. And, we just need to find out then we can simply get that data
// by just passing an existing key in the Database. It will return an array of data.
// .find() :- It will gives you all data from the db with same email in the array form.
//data.length :- This function is used for finding the length of the records which is present in the DB.


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


//Feed API - Get /feed - get all the users from the database.
// .find({})  :- If we are using like this then we will get all the document from the collection.

app.get("/feedAllData", async (req, res) => {
    try {
        const data = await User.find({});
        res.send(data);
    }
    catch(err) {
        res.send("Collection is empty. There is not document.");
    }
})

// .find() :- this method gives us the array of data
// .findOne() :- It only gives one data. Not the whole array of data.




app.post("/signup", async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.send("user added succesfully");
    }
    catch(err) {
        res.status(400).send("Error saving the user : ", err.message);
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
    console.log("Not connected successfully.", err);
})