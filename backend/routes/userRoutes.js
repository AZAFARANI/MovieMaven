require("dotenv").config();
const UserModel = require("../models/userModel");
const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");

userRouter.get("/hello", (req, res) => {
  res.send("hello");
});

userRouter.post("/register", async (req, res) => {
  const { userName, email, password, confirmPassword } = req.body;

  console.log(userName, email, password, confirmPassword);

  UserModel.findOne({ $or: [{ userName }, { email }] }, async (err, user) => {
    if (user) {
      res.send("Username or email already exists");
    } else if (password !== confirmPassword) {
      res.send("Password don't match");
    } else {
      const newUser = new UserModel({
        userName,
        email,
        password,
        registered: Date.now().toString(),
      });
      const userData = {
        username: userName,
        email: email,
      };
      await newUser.save();
      const accessToken = jwt.sign(userData, process.env.JWT_SECRET);
      res.send(accessToken);
      console.log(accessToken);
    }
  });
});

module.exports = userRouter;
