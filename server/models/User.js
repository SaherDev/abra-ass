const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, min: 5, max: 20, required: true, unique: true },
    password: { type: String, min: 5, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
