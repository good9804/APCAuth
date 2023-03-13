const mongoose = require("mongoose");

// Define Schemes
const todoSchema = new mongoose.Schema(
  {
    todoid: { type: Number, unique: true },
  },
  {
    timestamps: true,
  }
);

// Create Model & Export
module.exports = mongoose.model("Todo", todoSchema);
