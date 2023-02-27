require("dotenv").config();
const postModel = require("../models/postModel");
const express = require("express");
const postRouter = express.Router();
const jwt = require("jsonwebtoken");
const PostModel = require("../models/postModel");
const userModel = require("../models/userModel");
const { ObjectId } = require("mongodb");
const { default: mongoose } = require("mongoose");

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

postRouter.post("/newpost", verifyToken, async (req, res) => {
  const { userName, title, content, imageUrl } = req.body;

  console.log(req.body);

  const newPost = new PostModel({
    userName,
    title,
    content,
    imageUrl,
    date: new Date(),
    likes: [],
    comments: [],
  });

  await newPost.save();
  return res.status(200).json({
    success: true,
    message: "Post saved!",
  });
});

postRouter.put("/post/:id/edit", async (req, res) => {
  const token = req.headers["auth-token"];
  const post = req.body;
  const user = await userModel.findOne({ userName: post.userName }).lean();

  const postToEdit = await postModel.findOne({ _id: req.params.id });

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const checkId = user._id.toString();

    if (userId !== checkId) {
      console.log(userId, user._id);
      return res.status(401).json({
        success: false,
        message: "Acces denied!",
      });
    } else {
      postToEdit.content = post.content;

      await postToEdit.save();
      return res.status(200).json({
        message: "post updated!",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "invalid token!",
    });
  }
});

postRouter.delete("/post/:id/delete", async (req, res) => {
  const token = req.headers["auth-token"];
  const post = req.body;
  const user = await userModel.findOne({ userName: post.userName }).lean();

  const postToDelete = await postModel.findOne({ _id: req.params.id });

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const checkId = user._id.toString();

    if (userId !== checkId) {
      console.log(userId, user._id);
      return res.status(401).json({
        success: false,
        message: "Acces denied!",
      });
    } else {
      await postModel.deleteOne({ _id: postToDelete._id.toString() });
      return res.status(200).json({
        success: true,
        message: "Post deleted",
      });
    }
  } catch (err) {
    console.log(err);
    res.send(400);
  }
});

postRouter.put("/post/:id/like", verifyToken, async (req, res) => {
  const postToDelete = await postModel.findOne({ _id: req.params.id });
  const userLike = req.body;

  const checkIfLiked = postToDelete.likes.filter(
    (l) => l.user === userLike.user
  );
  if (checkIfLiked.length != 0) {
    return res.status(401).json({
      success: false,
      message: "Acces denied!",
    });
  } else {
    postToDelete.likes.push(userLike);
    await postToDelete.save();

    return res.status(200).json({
      success: true,
      message: "post liked!",
    });
  }
});

postRouter.put("/post/:id/unlike", async (req, res) => {
  const user = req.body;
  const token = req.headers["auth-token"];
  const getUser = await userModel.findOne({ userName: user.user }).lean();
  const getPost = await postModel.findOne({ _id: req.params.id }).lean();

  const checkIfLiked = getPost.likes.filter((l) => l.user === user.user);

  const findIndex = getPost.likes.findIndex((i) => i.user === user.user);

  if (checkIfLiked.length != 0) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;

      const checkId = getUser._id.toString();

      if (userId !== checkId) {
        return res.status(401).json({
          success: false,
          message: "Acces denied!",
        });
      } else {
        const newLike = [...getPost.likes];
        newLike.splice(findIndex, 1);

        await postModel.updateOne({ _id: req.params.id }, { likes: newLike });

        return res.status(200).json({
          success: true,
          message: "Post unliked!",
        });
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  } else {
    return res.status(404).json({
      success: false,
      message: "not found",
    });
  }
});

postRouter.put("/post/:id/comment", verifyToken, async (req, res) => {
  const postToComment = await postModel.findOne({ _id: req.params.id });
  const userComment = req.body;

  try {
    postToComment.comments.push(userComment);
    await postToComment.save();

    return res.status(200).json({
      success: true,
      message: "comment posted!",
    });
  } catch {
    return res.sendStatus(500);
  }
});

module.exports = postRouter;
