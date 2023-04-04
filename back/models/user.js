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
    productList: [
      new mongoose.Schema(
        {
          item: { type: String },
          kind: { type: String },
          boxcolor: { type: String },
          kg: { type: Number },
          quantity: { type: Number },
          others: { type: String },
        },
        {
          timestamps: true,
        }
      ),
    ],
  },
  {
    timestamps: true,
  }
);

// Create Model & Export
module.exports = mongoose.model("User", userSchema);
