const express = require("express");
const app = express();
const PORT = 8000;



// http://localhost:8000/queries?userId=101&name=mudit
app.get("/queries",(req, res) => {
    console.log(req.query);
    res.send("Hello");
})

//http://localhost:8000/dynamicroute/101/mudit
app.get("/dynamicroute/:userID/:name",(req, res) => {
    console.log(req.params);
    console.log(req.params.userID);
    console.log(req.params.name);
    res.send("Hello, It is basically used when we pass data in url dynamically. \n so, we can access that data using above way.");
})

app.listen(PORT,()=>{
    console.log(`Server is running on port number ${PORT}`);
})