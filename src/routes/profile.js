const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");
const { validateEditProfileData, validateNewPassword } = require("../helper/validation.js");
// profile api
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("error is : " + err.message);
  }
});

// profile edit
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("invalid edit request");
    }

    const loggedinUSer = req.user;
    Object.keys(req.body).forEach((key) => (loggedinUSer[key] = req.body[key]));
    await loggedinUSer.save();
    res.send(`${req.body.firstName}'s data updated successfully!`);
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

// forgot password api
// profileRouter.patch("/profile/password", userAuth, async (req, res)=>{
//   try {
//     if (!validateNewPassword(req)) {
//       throw new Error("invalid edit request");
//     }

//     const loggedinUSer = req.user;
//     Object.keys(req.body).forEach((key) => (loggedinUSer[key] = req.body[key]));
//     await loggedinUSer.save();
//     res.send(`${loggedinUSer.firstName}'s password updated successfully!`);
//   } catch (error) {
//     res.status(400).send("Error : " + error.message);
//   }
// })

module.exports = profileRouter;
