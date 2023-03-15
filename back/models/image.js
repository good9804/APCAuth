const mongoose = require("mongoose");

// Define Schemes
const imageSchema = new mongoose.Schema(
  {
    imgdata: { type: Buffer },
  },
  {
    timestamps: true,
  }
);

// Create Model & Export
module.exports = mongoose.model("Image", imageSchema);
