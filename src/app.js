const express = require("express");
const app = express();
const port = 3000;

app.use(
  "/user",
//   these are route handlers 
  (req, res, next) => {
    console.log("chandrika 1")
    // res.send(" 1 User route");
    next()
  },
  (req, res,next ) => {
    console.log("chandrika 2");
    // res.send("2 hai ");
    next()
  },
  (req, res,next ) => {
    console.log("chandrika 3");
    // res.send("3hai ");
    next()
  },
  (req, res,next ) => {
    console.log("chandrika 4");
    res.send("4hai ");
    next()
  },
);

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
