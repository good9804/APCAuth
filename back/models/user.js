const mongoose = require("mongoose");

// Define Schemes
const userSchema = new mongoose.Schema(
  {
    user_id: { type: String, unique: true },
    user_name: { type: String },
    password: { type: String },
    refresh_token: { type: String },
    submit_role: {
      type: Number,
      default: 3, //3 : error
    },
    role: {
      type: Number,
      default: 2, //2 : ready state
    },
    product_list: [
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
    import_history: [
      new mongoose.Schema(
        {
          item: { type: String },
          kind: { type: String },
          weight: { type: Number },
          row: { type: Number },
          col: { type: Number },
          ratio: { type: Number },
          hardness: { type: Number },
          brix: { type: Number },
          acidity: { type: Number },
          color: { type: Number },
          grade_A: { type: Number },
          grade_B: { type: Number },
          grade_C: { type: Number },
          grade_D: { type: Number },
          grade_E: { type: Number },
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
