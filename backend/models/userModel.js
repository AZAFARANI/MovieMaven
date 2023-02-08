const { Schema } = require("mongoose");

const userSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: ture },
  registered: { type: String, required: true },
});

const userModel = mongoose.model("uesers", userSchema);

module.exports = userModel;
