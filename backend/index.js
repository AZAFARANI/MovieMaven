const express = require("express");
const PostModel = require("./models/postModel");
require("dotenv").config();
require("./database");
process.env.CONNECTION_STRING;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "html");

app.listen(8000, () => {
  console.log("Server is running at http://localhost:8080");
});
