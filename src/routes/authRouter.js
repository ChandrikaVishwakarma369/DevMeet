const express = require('express')
const authRouter = express.Router()
const {validateSignUpData} = require('../helper/validation.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require("cookie-parser"); 
const User = require("../models/user.js");
authRouter.use(cookieParser());
// signup route (API) for adding users
authRouter.post("/signup", async (req, res) => {
  try {
  // validation of data using helping function
  validateSignUpData(req)
 
  const {firstName , lastName , emailId , password} = req.body;

  // encrypt the password
  const passwordHash = await bcrypt.hash(password, 10)  

   // creating instance of the user model
  const user = new User({
    firstName,
    lastName,
    emailId,
    password : passwordHash
  });

    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("Error : "+ err.message);
  }
});
// login router
authRouter.post("/login", async (req, res)=>{
try {
  const {emailId, password} = req.body;
  const user = await User.findOne({emailId : emailId})
  if(!user){
    throw new Error("Invalid credentials!")
  }
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if(isPasswordValid){
    // create a JWT token
    const token = await jwt.sign({_id : user._id}, "DEVSECRETKEY", {expiresIn : '7d'})
    // send the token to cookies and send the response to the user
    res.cookie("token", token, {
      expires : new Date(Date.now() + 8*3600000)
    });
   res.send("login successful")
  }else{
     throw new Error("Invalid credentials!")
  }
} catch (error) {
  res.status(400).send("ERROR :" + error.message)
}
})
module.exports = authRouter;