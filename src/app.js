const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const port = 3000;
app.use(express.json());

const authRouter = require('./routes/authRouter.js')
const profileRouter = require('./routes/profile.js')
const requestRouter = require('./routes/requests.js')

app.use('/', authRouter)
app.use('/', profileRouter)
app.use('/', requestRouter)

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
