const express = require("express");
const app = express();
const PORT = 8000;

const connectDB = require("./config/database");
const User = require("./models/user");

app.get("/",((req, res)=> {
    res.send("You are on home page");
}))

app.post("/signup", async (req, res) => {
    const data = {
        firstName : "Mudit",
        latsName : "Rayvoria",
        email : "muditrayvoria@gmail.com",
        password : "mudit@123",
        age : 24,
        gender : "Male"
    }
    const user = new User(data);
    await user.save();
    res.send("user added succesfully");
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