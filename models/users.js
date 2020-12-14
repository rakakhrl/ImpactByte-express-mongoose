const mongoose = require("mongoose");
const { LIBRARIAN, CUSTOMER } = require("../constant/role");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 6,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      required: true,
      enum: [CUSTOMER, LIBRARIAN],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
