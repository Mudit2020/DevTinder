const express = require("express");
const app = express();
const PORT = 8000;

const connectDB = require("./config/database");
const User = require("./models/user");

app.use(express.json());

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

connectDB()
.then(()=>{
    console.log("Database successfully Connected");
    app.listen(PORT,()=>{
        console.log(`Server is running on port number ${PORT}`);
    })
}).catch((err) => {
    console.log("Not connected successfully.", err);
})