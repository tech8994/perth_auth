const db = require("../db/index");
const { hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { SECRET } = require("../constants");


// register api
exports.register = async (req, res) => {
  try {
    // console.log("Validation Passed");
    const { email, password } = req.body;
    const hashPassword =await hash(password, 10);

    await db.query("INSERT INTO user_table (email,password) VALUES ($1,$2)", [
      email,
      hashPassword,
    ]);
    res.status(201).json({
        success: true,
        message: "The registration has been succesfully added"
    })
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
        error: error.message
    })
  }
};


// get all user
exports.getAllUser=async(req, res) =>{
    try {
    let {rows}=await db.query("SELECT * FROM user_table")
    return res.status(200).json({
        success: true,
        users: rows
    })
    } catch (error) {
       console.log(error.message)
       return res.status(500).json({
        error: error.message
    })  
    }

}
// login

exports.loggedin=async(req, res)=>{
  try {
    let user=req.user
    let payload={
        id: user.user_id,
        email: user.email
    }
    const token=sign(payload, SECRET)
    res.status(200).cookie("token", token,{httpOnly: true}).json({
        message: "Logged in Successfully",
        success: true
    })
    
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
        error: error.message
    })
  }
}