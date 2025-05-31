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

// .find() :- this method gives us the array of data
// .findOne() :- It only gives one data. Not the whole array of data.

//Feed API - Get /feed - get all the users from the database.
// .find({})  :- If we are using like this then we will get all the document from the collection.

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






// .delete () :- It deletes whole in one go.
// .deleteOne() :-  It delete only one matching record from the collection.
// .deleteMany() :- It deletes all the matching records from the collection.
// .findByIdAndDelete() :- It deletes the collection . jiski id match kar rahi hogi.
// .findOneAndDelete() :- finds a single document matching a provided filter, deletes it, 
// and then returns the deleted document (if found)

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

        //Below code delete all records from db in one go.
        // const data = await User.deleteMany({});
        // if(data["deletedCount"]>0) {
        //     res.send("Whole data is deleted succesfully");
        // }
        // else {
        //     res.send("Data is not present");
        // }
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
        console.log(updatedData);
        // {_id : userId} - It is used for finding the document.
        // data - It is the data which is going to update.
        // { returnOriginal: true });   :- This one return original document after the update.
        // { returnOriginal: false });   :- This one return original document after the update.
        res.send("User Details updated succesfully");
    }
    catch(err) {
        res.status(400).send("Data not found.");
    }
})


//Learn other function as well for patch.
// difference btween patch and put ?
// Update the data using email id as above.








app.post("/signup", async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.send("user added succesfully");
    }
    catch(err) {
        // res.status(400).send(`Error saving the user: ${err.message}`);
        res.status(400).send("Error saving the user: " + err.message);
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