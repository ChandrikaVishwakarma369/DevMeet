const express = require("express");
const connectDB = require("./config/database.js");
const cookieParser = require("cookie-parser"); 
const app = express();
const port = 3000;
app.use(express.json());
app.use(cookieParser());
const User = require("./models/user.js");
const {validateSignUpData} = require('./helper/validation.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {userAuth} = require("./middlewares/auth.js")
// signup route (API) for adding users
app.post("/signup", async (req, res) => {
  try {
  // validation of data using helping function
  validateSignUpData(req)
 
  const {firstName , lastName , emailId , password} = req.body;

  // encrypt the password
  const passwordHash = await bcrypt.hash(password, 10)  
  console.log(passwordHash)

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
// login api
app.post("/login", async (req, res)=>{
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
// profile api
app.get('/profile',userAuth, async (req, res)=>{
  try{
  const user = req.user;
  res.send(user)
  }catch(err){
    res.status(400).send("error is : " + err.message)
  }
})
// send the connection request
app.post('/sendConnectionRequest',userAuth,async (req, res) => {
  const user = req.user;
  res.send(`${user.firstName} send the connection!`)
})
connectDB()
  .then(() => {
    console.log("db connected");
    app.listen(port, () => {
      console.log(`server is listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
