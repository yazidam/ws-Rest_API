const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String },
    email: {
      type: String,
      unique: true,
    },
    phone: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = User = model("user", userSchema);
