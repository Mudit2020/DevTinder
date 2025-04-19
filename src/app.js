const express = require("express");
const app = express();
const PORT = 8000;


// //Next method() . It is basically used to transfer the control form one route handle to other Route handler. 

// //Below one is working fine.
// app.get("/", (req, res, next) => {
//     console.log("1st Response");
//     next(); // It is used for passing the control.
// });


// app.get("/", (req, res) => {
//     res.send("2nd response");
// });







// // Error :- Cannot set headers after they are sent to the client
// app.get("/", (req, res, next) => {
//     res.send("1st Response");
//     next(); 
// });

// app.get("/", (req, res) => {
//     res.send("2nd response");
// });



// // Error :- Cannot set headers after they are sent to the client
// app.get("/", (req, res, next) => {
//     next();
//     res.send("1st Response"); 
// });

// app.get("/", (req, res) => {
//     res.send("2nd response");
// });



// // Error :- Cannot set headers after they are sent to the client
// app.get("/", (req, res, next) => {
//     res.send("1st Response"); 
//     next();
// });

// app.get("/", (req, res, next) => {
//     res.send("2nd response");
//     next();
// });



// // The below code goes into the hand state.because there is no response sendby the client.
// app.get("/", (req, res, next) => {
//     console.log("1st Response"); 
//     next();
// });

// app.get("/", (req, res) => {
//     // res.send("2nd Response");
// });












app.get("/", (req, res, next) => {
    console.log("1st Response"); 
    next();
});

app.get("/", (req, res) => {
    res.send("2nd Response");
});


// // Note:- server ek hi baar response deta hai ek request ke liye. Isliye, ek se jaada res.send work nahi kar rhe hai.







app.listen(PORT,()=>{
    console.log(`Server is running on port number ${PORT}`);
})