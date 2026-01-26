const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const port = 3000;
app.use(express.json());
const User = require("./models/user.js");
// signup route (API) for adding users
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    // console.log(user);
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});
// user route where get specific user by one mail id 
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("no users found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(404).send("user not present");
  }
});
// feed route - get all users data
app.get("/feed" , async (req, res)=> {
  try{
    const users = await User.find({})
    res.send(users)
  }catch(err){
    res.status(400).send("error in fetching all users ")
  }
})
// delete user by id
app.delete("/user", async (req, res)=>{
  const userId = req.body.userId
  try {
    await User.findByIdAndDelete(userId)
    res.send("user deleted successfully")
  } catch (err) {
    res.status(400).send("error in deleting user")
  }

})
// update the data 
app.patch("/user", async (req,res) => {
  const userId = req.body.userId
  const data = req.body
 
  try {
     const allowedUpdates = ["userId","photoURL", "about", "skills", "age", "gender"]
  const isUpdateAllowed = Object.keys(data).every((update) => allowedUpdates.includes(update))
  if(!isUpdateAllowed){
    return res.status(400).send("invalid updates")
  }
    await User.findByIdAndUpdate({_id : userId}, data,{
      runValidators : true,
    })
    res.send("user data updated succesfully")
  }catch(err) {
    res.status(400).send("ERROR MESSAGE :" + err.message)
  }
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
