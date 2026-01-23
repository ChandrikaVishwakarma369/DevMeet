const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const port = 3000;
app.use(express.json())
const User = require("./models/user.js");
app.post("/signup", async (req, res) => {
  const user = new User(req.body)
try {
console.log(user)
await user.save()
res.send("user added successfully")

}catch(err){
  res.status(400).send("error in saving user in database ")
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
