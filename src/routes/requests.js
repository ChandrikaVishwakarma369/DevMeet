const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");
const ConnectionRequestModel = require("../models/connectionRequest.js");
const User = require('../models/user.js')
// send the connection request
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      // const user = req.user;
      const toUserId = req.params.toUserId;
      const fromUserId = req.user._id;
      const status = req.params.status;
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "invalid status type", statusReceived: status });
      }
      const toUser = await User.findById(toUserId);
      if(!toUser){
        return res.status(404).json({message : "User not found!"})
      }
      // is there any connection request exists
      const existingConnectionRequest = await ConnectionRequestModel.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId : toUserId, toUserId:fromUserId },          
        ],
      });
      if(existingConnectionRequest){
        return res.status(400).send("connection request already exists! you are trying to connect again!")
      }
      const connectionRequest = new ConnectionRequestModel({
        toUserId,
        fromUserId,
        status,
      });
      const data = await connectionRequest.save();
      res.send(
        {
           message: `${req.user.firstName} is ${status} ${toUser.firstName}`, 
           data 
        }
      );
    } catch (err) {
      res.status(400).send(`error is : ${err}`);
    }
    // res.send(`${user.firstName} send the connection!`);
  },
);

module.exports = requestRouter;
