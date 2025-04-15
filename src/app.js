const express = require("express");
const app = express();
const PORT = 8000;

app.use("/",(req, res) => {
    res.send("Hi, Server is build succesfully");
})

app.listen(PORT,(req, res) => {
    console.log(`Server is running on port number ${PORT}`);
})