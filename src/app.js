const express = require("express");
const app = express();
const PORT = 8000;


app.get("/getUserData", (req, res) => {
    throw new Error ("cnwekfnrej");
    res.send("User Data Sent")
})


//below code is basically used. when upar agar kisi bhi route main error handle agr nahi hoti hai to wo neeche waaley 
// route se handle ho jayegi.
// Remember order of code matter alot.

app.use("/", (err, req, res, next) => {
    if(err) {
        res.status(500).send("error occurred");
    }
})

app.listen(PORT,()=>{
    console.log(`Server is running on port number ${PORT}`);
})