const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const verify = require("../config/JWTVerification");

//Custom imports
const {
  createPost,
  getAllPosts,
  savePost,
  savedPosts,
  getSinglePost,
  mostViewedInLastDay,
  findCategoryPosts,
  searchVideos,
  deleteAPost,
  getPostsForDashboard,
  updateAPost,
} = require("../controllers/postController");

router.post("/create", verify, upload.single("file"), createPost);

router.get("/all", getAllPosts);

router.delete("/delete/:id", deleteAPost);

router.get("/save/:id", verify, savePost);

router.post("/update/:id", verify, updateAPost);

router.put("/updateWithFile/:id", verify, upload.single("file"), updateAPost);

router.get("/saved", verify, savedPosts);

router.get("/trending", mostViewedInLastDay);

router.get("/search", searchVideos);

router.get("/allPosts", getPostsForDashboard);

router.get("/category/:category", findCategoryPosts);

router.get("/:id", getSinglePost);

module.exports = router;
