const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const Post = require("./Post");
const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: [true, "No duplicate username allowed"],
  },
  email: {
    type: String,
    required: true,
    unique: [true, "No duplicate email is allowed"],
  },
  password: {
    type: String,
    required: true,
  },
  subscribers: {
    type: Number,
    default: 0,
  },
  profilePicture: {
    type: String,
    default: "",
  },
  reads: {
    type: Number,
    default: 0,
  },
  readTime: {
    type: Number,
    default: 0,
  },
  publishedarticles: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Post",
    default: [],
  },
  savedArticles: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Post",
    default: [],
  },
  subscribedTo: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
});

const User = model("user", userSchema);

module.exports = User;
