const express = require("express");
const { UserModel } = require("../Models/User.model");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");



userRouter.post("/signup", async (req, res) => {
  const { email, password, username } = req.body;
  const check_exist = await UserModel.find({ email });
  try {
    if (check_exist.length > 0) {
      res.send({ response: "user already registerd please login" });
    } else {
      //we required bcryt package for hasing password
      bcrypt.hash(password, 4, async function (err, hash) {
        // Store hash in your password DB.
        const userDetails = new UserModel({ email, password: hash, username });
        await userDetails.save();
        res.send({ response: "user registerd successfully" });
      });
    }
  } catch (error) {
    res.send("something went wrong please try again");
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password, username } = req.body;
  const check_exist = await UserModel.find({ email });
  console.log(check_exist);
  if (check_exist.length > 0) {
    try {
      //compare user password with hased password
      const hased_password = check_exist[0].password;
      bcrypt.compare(password, hased_password, function (err, result) {
        // result == true if password matched
        if (result) {
          //genrate a token using jwt package and send back to user
          var token = jwt.sign({ userID: check_exist[0]._id }, "secret");
          res.send({ token: token });
        } else {
          res.send({ response: "please enter valid details" });
        }
      });
    } catch (error) {
      console.log(error.message);
      res.send("something went wrong please try after sometime");
    }
  } else {
    res.send({ response: "please signup first" });
  }
});

module.exports = { userRouter };
