require("dotenv").config();
const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");

module.exports = userRouter;
