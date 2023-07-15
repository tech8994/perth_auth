const express=require("express");
const app=express();
const {PORT} =require("./constants");
const cookieParser=require("cookie-parser")
var cors = require('cors')


// initialize middlware
app.use(express.json())
app.use(cookieParser())
app.use(cors())
// import route
const authRoute =require("./routes/auth")
// initialize route
app.use("/api", authRoute);

const appStart=()=>{
    try {
        app.listen(PORT,() =>{
            console.log("This is PORT Listen",PORT);
        })
    } catch (error) {
        console.log("Error", error);
    }
}
appStart();