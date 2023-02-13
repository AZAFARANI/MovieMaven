require("dotenv").config();
const postModel = require("../models/postModel");
const express = require("express");
const postRouter = express.Router();
const jwt = require("jsonwebtoken");

postRouter.get("/posts", verifyToken, async (req, res) => {
  try {
    const posts = await postModel.find({}).lean();

    return res.json({
      success: true,
      posts: posts,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error getting posts",
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

postRouter.get("/post/:id", verifyToken, async (req, res) => {
  const stringId = req.params.id;

  try {
    const post = await postModel.findOne({ _id: stringId }).lean();

    return res.json({
      success: true,
      post: post,
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: "Not found!",
    });
  }
  res.sendStatus(200);
});

module.exports = postRouter;
