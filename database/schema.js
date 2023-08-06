const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  playlist: {
    type: Array,
    required: false,
  },
});

const User = mongoose.model("userData", userSchema);

model.exports = User;
