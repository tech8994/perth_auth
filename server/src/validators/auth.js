const db = require("../db");
const { check } = require("express-validator");
const { compare } = require("bcryptjs");


// password
const password=check("password").isLength({min:6,max:15}).withMessage('Password must be 6 to 15 characters');

// email
const email=check("email").isEmail().withMessage('Please Provide Email');

// check if email exist
// in postgres query we use the to find something via WHERE varName  the $1 does is that it is select the value inside the array []
let isEmailExists=check("email").custom(async(value) =>{
    const {rows}=await db.query("SELECT * FROM user_table WHERE email = $1",[value])

    if(rows.length){
        throw new Error('Email is already exists')
    }
})

// login autentication

let isLoggedIn=check("email").custom(async(value,{req}) =>{
   let userDetails=await db.query("SELECT * FROM user_table WHERE email =$1",[value])

    if(!userDetails.rows.length){
        throw new Error("Email is not Found")
    }

    let checkPassword=await compare(req.body.password, userDetails.rows[0].password)
    if(!checkPassword){
        throw new Error("Password is notn correct") 
    } 
    req.user=userDetails.rows[0]

})

module.exports={
    registrationValue: [email, password,isEmailExists],
    isLoggedInValidation: [isLoggedIn]
}