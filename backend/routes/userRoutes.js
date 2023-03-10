require("dotenv").config();
const UserModel = require("../models/userModel");
const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const { hashedPassword, comparePassword } = require("../utils");

userRouter.post("/register", async (req, res) => {
  const { userName, email, password, confirmPassword } = req.body;

  UserModel.findOne({ $or: [{ userName }, { email }] }, async (err, user) => {
    if (user) {
      res.send("Username or email already exists");
    } else if (password !== confirmPassword) {
      res.send("Password don't match");
    } else {
      const newUser = new UserModel({
        userName,
        email,
        password: hashedPassword(password),
        registered: new Date().toLocaleDateString(),
      });

      await newUser.save();
      const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);

      res.send({ token, user: newUser.userName });
    }
  });
});

userRouter.post("/login", async (req, res) => {
  const username = req.body.userName;
  const password = req.body.password;

  try {
    const user = await UserModel.findOne({ userName: username });

    const isMatch = comparePassword(password, user.password);

    if (isMatch === true) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      return res.json({
        success: true,
        message: "Authentication successful!",
        token: token,
        user: user.userName,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Incorrect username or password",
      });
    }
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Incorrect username or password",
    });
  }
});

userRouter.get("/users", verifyToken, async (req, res) => {
  try {
    const users = await UserModel.find({}).lean();

    return res.json({
      success: true,
      users: users,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error getting users",
    });
  }
});

function verifyToken(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "access denied!",
    });
  }
}

userRouter.get("/user/:id", verifyToken, async (req, res) => {
  try {
    const user = await UserModel.findOne({ userName: req.params.id }).lean();

    return res.json({
      success: true,
      user: user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error getting user",
    });
  }
});

module.exports = userRouter;
