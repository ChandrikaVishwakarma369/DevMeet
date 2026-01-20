const express = require('express')
const app = express()
const port = 3000
app.get("/" , (req, res) => {
    res.send('this is home page');
})
app.get("/user", (req, res) => {
    res.send({name : "chandrika" , age : 21})
})
app.post("/user", (req, res)=>{
    res.send("user created successfully")
})
app.delete("/user" , (req, res) => {
    res.send("user deleted ")
})
app.listen(port,()=>{
    console.log(`server is listening on port ${port}`)
})