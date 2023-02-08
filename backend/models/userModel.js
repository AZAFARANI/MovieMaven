const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  registered: { type: String, required: true },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
