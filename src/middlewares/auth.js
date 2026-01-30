const jwt = require('jsonwebtoken');
const User = require("../models/user.js")
const userAuth = async (req, res, next) => {
    try{
         // read the token from the req cookies
    const {token} = req.cookies
    if(!token){
        throw new Error("invalid token")
    }
    const decodeObj = await jwt.verify(token , "DEVSECRETKEY")
    // validate the token
    const {_id} = decodeObj
    const user = await User.findById(_id)
    if(!user){
        throw new Error("user does not exist")
    }
    req.user = user;
    next()
    // find the user
    }catch(err){
        res.status(400).send("error is : " + err.message)
    }
   
}

module.exports = { userAuth };