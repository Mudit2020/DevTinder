
const userAuth = (req, res, next) => {
    console.log("This authentication for the user level");
    const userPassword = "MuditUser1@20";
    if(userPassword === "MuditUser1@20") {
        next();
    }
    else{ 
        res.status(401).send("Unauthorized Admin. Check your password");
    }
}


const userAdmin = (req, res, next) => {
    console.log("This authentication for the Admin Level");
    const adminPassword = "MuditAdmin1@20";
    if(adminPassword === "MuditAdmin1@20") {
        next();
    }
    else {
        res.status(401).send("Unauthorized Admin. Check your password")
    }
}

module.exports = {userAuth, userAdmin};



