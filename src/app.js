const express = require("express");
const app = express();
const PORT = 8000;

const {userAuth, userAdmin} = require("../middlewares/auth")

// Below line is basically used . If authentication falis then it return from here. We don't need to go down.
//This one is the correct way to use

app.use("/admin", userAdmin);


app.get("/user/getAllData", userAuth, (req, res) => { 
    res.send("Hi, My name is mudit. I am a User of this app.");
})

app.get("/admin/getAllData", userAdmin, (req, res) => {
    res.send("Hi, My name is mudit. I am a Admin of this app.")
})


app.listen(PORT,()=>{
    console.log(`Server is running on port number ${PORT}`);
})