const express = require("express");
const app = express();
const port = 3000;

// error handling btw we can use try ,catch block but here we also can use "err" in route handlers with req, res like this : -- (err, req, res) 
app.get("/getUserData", (req, res) => {
    throw new Error("heyerror")
    res.send("user data sent!")
});

app.use("/", (err , req, res, next) => {
    if(err){
        res.status(500).send("something wrong!")
    }
})

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
