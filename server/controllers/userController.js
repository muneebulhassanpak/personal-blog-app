const User = require("../models/User");
const CustomError = require("../ErrorHandling/Error");
const fs = require("fs");

// => Creating a user
exports.createAUser = async (req, res, next) => {
  try {
    const user = await User.create({ ...req.body });
    if (!user) throw new CustomError(500, "Something went wrong creating user");
    return res.json({
      success: true,
      user,
    });
  } catch (err) {
    return next(err);
  }
};

// => Fetching a user data
exports.fetchUserData = async (req, res, next) => {
  const userId = req.user.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError(500, "No such user exists");
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    return next(err);
  }
};

// => Updating a user data
exports.updateUserData = async (req, res, next) => {
  const userId = req.user.userId;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { ...req.body },
      { new: true }
    );
    if (!user) {
      throw new CustomError(500, "No such user exists");
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    return next(err);
  }
};

// => Updating a profile picture
exports.updateProfilePicture = async (req, res, next) => {
  const userId = req.user.userId;
  try {
    const { originalname } = req.file;
    const fileExtension = originalname.split(".")[1];
    newFileName = req.file.path + "." + fileExtension;
    fs.renameSync(req.file.path, newFileName);
    const updatedUser = await User.findByIdAndUpdate(userId, {
      profilePicture: newFileName,
    });
    if (!updatedUser)
      throw new CustomError(500, "Error setting profile picture");
    return res.json({
      success: true,
      post: updatedUser,
    });
  } catch (err) {
    return next(err);
  }
};
