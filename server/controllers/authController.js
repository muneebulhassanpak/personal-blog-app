require("dotenv").config();
const CustomError = require("../ErrorHandling/Error");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// => Creating a new user
exports.createUser = async (req, res, next) => {
  const { fullname, username, email, password } = req.body;
  try {
    if (!fullname || !username || !email || !password) {
      throw new CustomError(400, "Missing fields for registration");
    }
    const user = await User.create({ fullname, username, email, password });
    if (!user) {
      throw new CustomError(500, "Something went wrong in User creation");
    }
    return res.json({
      success: "ok",
      user,
    });
  } catch (err) {
    return next(err);
  }
};

// => Logging in a user
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new CustomError(400, "Missing fields for login");
    }
    const user = await User.findOne({ email: email, password: password });
    if (!user) {
      throw new CustomError(500, "Invalid credentials");
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    return res.status(200).cookie("access_token", token).json({
      success: true,
      user,
    });
  } catch (err) {
    return next(err);
  }
};
