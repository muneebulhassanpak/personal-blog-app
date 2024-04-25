const express = require("express");
const router = express.Router();
const verify = require("../config/JWTVerification");
const multer = require("multer");
const upload = multer({ dest: "uploads/ProfilePictures" });
const {
  fetchUserData,
  createAUser,
  updateUserData,
  updateProfilePicture,
} = require("../controllers/userController");

router.post("/create", createAUser);

router.get("/fetch", verify, fetchUserData);

router.post("/update", verify, updateUserData);

router.post(
  "/updateProfilePicture",
  verify,
  upload.single("file"),
  updateProfilePicture
);

module.exports = router;
