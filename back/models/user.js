const mongoose = require("mongoose");

// Define Schemes
const userSchema = new mongoose.Schema(
  {
    userid: { type: String, unique: true },
    username: { type: String },
    password: { type: String },
    refreshToken: { type: String },
    submitrole: {
      type: Number,
      default: 3, //3 : error
    },
    role: {
      type: Number,
      default: 2, //2 : ready state
    },
  },
  {
    timestamps: true,
  }
);

// Create Model & Export
module.exports = mongoose.model("User", userSchema);
