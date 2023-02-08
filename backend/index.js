const express = require("express");
const PostModel = require("./models/postModel");
const UserModel = require("./models/userModel");
require("dotenv").config();
require("./database");
process.env.CONNECTION_STRING;

const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "html");
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

//routes
app.use("user", userRouter);

app.listen(8000, () => {
  console.log("Server is running at http://localhost:8080");
});
