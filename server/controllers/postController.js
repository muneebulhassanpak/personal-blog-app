const CustomError = require("../ErrorHandling/Error");
const fs = require("fs");
const path = require("path");
const Post = require("../models/Post");
const User = require("../models/User");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// => New post creation
exports.createPost = async (req, res, next) => {
  let newFileName;
  if (req.file) {
    const { originalname } = req.file;
    const fileExtension = originalname.split(".")[1];
    newFileName = req.file.path + "." + fileExtension;
    fs.renameSync(req.file.path, newFileName);
  }
  const { title, summary, content, category } = req.body;
  console.log(req.query.draft);
  console.log(category);
  if (req.query.draft == "Y") {
    try {
      const post = await Post.create({
        title,
        summary,
        content,
        category,
        isDraft: true,
        featuredImage: newFileName,
        creator: req.user.userId,
      });
      if (!post) {
        throw new CustomError(500, "Something went wrong in post creation");
      }

      const user = await User.findByIdAndUpdate(
        req.user.userId,
        {
          $addToSet: { publishedarticles: post._id },
        },
        { new: true }
      );
      if (!user)
        throw new CustomError(
          500,
          "Something went wrong inserting post id in user doc"
        );
      return res.json({
        success: true,
        post,
        user,
      });
    } catch (err) {
      return next(err);
    }
  } else {
    try {
      const post = await Post.create({
        title,
        summary,
        content,
        category,
        featuredImage: newFileName,
        creator: req.user.userId,
      });
      if (!post) {
        throw new CustomError(500, "Something went wrong in post creation");
      }
      const user = await User.findByIdAndUpdate(
        req.user.userId,
        {
          $addToSet: { publishedarticles: post._id },
        },
        { new: true }
      );
      if (!user)
        throw new CustomError(
          500,
          "Something went wrong inserting post id in user doc"
        );
      return res.json({
        success: true,
        post,
        user,
      });
    } catch (err) {
      return next(err);
    }
  }
};

// => All posts fetching
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.aggregate([
      {
        $match: {
          isDraft: false, // Only return posts with isDraft set to false
        },
      },
      {
        $lookup: {
          from: "users", // Assuming the "User" collection name is "users"
          localField: "creator",
          foreignField: "_id",
          as: "creatorInfo",
        },
      },
      {
        $unwind: "$creatorInfo",
      },
      {
        $project: {
          title: 1,
          summary: 1,
          content: 1,
          featuredImage: 1,
          createdAt: 1,
          category: 1,
          "creatorInfo.username": 1,
          "creatorInfo._id": 1,
        },
      },
      {
        $limit: 20,
      },
    ]);

    if (!posts) {
      throw new CustomError(500, "Something went wrong");
    }
    res.json(posts);
  } catch (error) {
    return next(err);
  }
};

// => Saving a post
exports.savePost = async (req, res, next) => {
  const personHimself = req.user.userId;
  const targetChannel = req.params.id;

  try {
    const person = await User.findById(personHimself);

    if (person.savedArticles.includes(targetChannel)) {
      const updatedUser = await User.findByIdAndUpdate(
        personHimself,
        { $pull: { savedArticles: targetChannel } },
        { new: true }
      );

      return res.status(200).json({
        status: 200,
        success: true,
        message: "Unsaved successfully",
        user: updatedUser,
      });
    } else {
      const updatedUser = await User.findByIdAndUpdate(
        personHimself,
        { $addToSet: { savedArticles: targetChannel } },
        { new: true }
      );

      return res.status(200).json({
        status: 200,
        success: true,
        message: "Saved successfully",
        user: updatedUser,
      });
    }
  } catch (error) {
    return next(error);
  }
};

// => Fetching saved posts for a user
exports.savedPosts = async (req, res, next) => {
  try {
    const requestingUser = req.user.userId;

    const user = await User.findById(requestingUser);

    if (!user) {
      throw new CustomError(500, "Something went wrong fetching the user");
    }

    const allPosts = user.savedArticles;
    const postPromises = allPosts.map((postId) =>
      // Post.findById(postId).limit(30).populate("creator")
      Post.findById(postId).limit(30)
    );

    const PostList = await Promise.all(postPromises);
    console.log(PostList);
    const mergedPostList = PostList.flat();

    return res.status(200).json({
      message: "Successfully fetched posts",
      success: true,
      subscriptions: user.subscribedTo,
      posts: mergedPostList,
    });
  } catch (err) {
    return next(err);
  }
};

// => Fetching most viewed in last 24 hours posts
exports.mostViewedInLastDay = async (req, res, next) => {
  const twentyFourHoursAgo = new Date();
  twentyFourHoursAgo.setDate(twentyFourHoursAgo.getDate() - 1);

  try {
    // Find posts with views in the last 24 hours and sort by view count in descending order
    const mostViewedPosts = await Post.find({
      updatedAt: { $gte: twentyFourHoursAgo },
    })
      .sort({ views: -1 })
      .limit(6); // You can change the limit to get more or fewer posts
    // .populate("creator", "username"); // Populate the "creator" field with the "username" field of the User model

    return res.json({
      success: true,
      posts: mostViewedPosts,
    });
  } catch (error) {
    return next(error);
  }
};

// => Fetching a single post
exports.getSinglePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    let post;
    if (!req?.user?.userId) {
      post = await Post.findByIdAndUpdate(
        postId,
        { $inc: { reads: 1 } },
        { new: true }
      );
    } else {
      const user = await User.findById(req.user.userId);
      if (user.publishedarticles.includes(postId)) {
        post = await Post.findById(postId);
      } else {
        post = await Post.findByIdAndUpdate(
          postId,
          { $inc: { reads: 1 } },
          { new: true }
        );
        user.reads += 1; // Increment reads in the user document
        await user.save(); // Save the updated user
      }
    }
    if (!post) throw new CustomError(404, "No such post exists");
    return res.json({
      success: true,
      post: post,
    });
  } catch (err) {
    return next(err);
  }
};

// => Search posts
exports.searchVideos = async (req, res, next) => {
  try {
    const query = req.query.q;
    console.log(query, "search");
    const posts = await Post.find({
      title: { $regex: query, $options: "i" },
    })
      .limit(20)
      .populate("creator");
    if (!posts) {
      return res.json({
        success: false,
        message: "No relevent posts found",
        posts,
      });
    }
    console.log(posts);
    return res.status(200).json({
      messsage: "successfully fetched posts",
      posts,
    });
  } catch (err) {
    return next(err);
  }
};

// => Find posts for a  category
exports.findCategoryPosts = async (req, res, next) => {
  try {
    const category = req.params.category;
    // const posts = await Post.find({ category: category }).populate("creator");
    const posts = await Post.find({ category: category });
    if (!posts)
      throw new CustomError(404, "Error while finding category posts");
    return res.json({
      success: true,
      posts: posts,
    });
  } catch (err) {
    return next(err);
  }
};

// => Fetch posts for a  dashboard
exports.getPostsForDashboard = async (req, res, next) => {
  try {
    const posts = await Post.aggregate([
      {
        $project: {
          _id: 1,
          id: "$_id",
          postTitle: "$title",
          category: 1,
          DOC: "$createdAt",
          status: "$isDraft",
        },
      },
    ]);
    console.log(posts);
    return res.json({
      success: true,
      posts,
    });
  } catch (err) {
    return next(err);
  }
};

// => Delete a post
exports.deleteAPost = async (req, res, next) => {
  const id = req.params.id;
  if (!id) throw new CustomError(402, "Post Id is required");
  try {
    const post = await Post.findById(id);
    if (!post) throw new CustomError(500, "Post Id is invalid");
    const fileName = post.featuredImage;
    const filePath = path.join(__dirname, "../", fileName);
    try {
      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
      } else {
        throw new Error("File not found.");
      }
    } catch (error) {
      throw error;
    }
    const deletedPost = await Post.deleteOne({ _id: id });
    if (!deletedPost) throw new CustomError(500, "Error deleting post");
    return res.json({
      success: true,
    });
  } catch (err) {
    return next(err);
  }
};

// => Edit a post
exports.updateAPost = async (req, res, next) => {
  const id = req.params.id;
  if (!id) throw new CustomError(402, "Post Id is required");
  try {
    const post = await Post.findById(id);
    if (!post) throw new CustomError(500, "No such post exists");
    let newFileName;
    const fileName = post.featuredImage;
    const filePath = path.join(__dirname, "../", fileName);
    try {
      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
      } else {
        throw new Error("File not found.");
      }
    } catch (error) {
      throw error;
    }
    if (req.file) {
      console.log("if");
      const { originalname } = req.file;
      const fileExtension = originalname.split(".")[1];
      newFileName = req.file.path + "." + fileExtension;
      fs.renameSync(req.file.path, newFileName);
      const updatedPost = await Post.findByIdAndUpdate(id, {
        ...req.body,
        featuredImage: newFileName,
      });
      if (!updatedPost) throw new CustomError(500, "Error updating post");
      return res.json({
        success: true,
        updatedPost,
      });
    } else {
      console.log("else");
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        {
          ...req.body,
        },
        { new: true }
      );
      if (!updatedPost) throw new CustomError(500, "Error updating post");
      return res.json({
        success: true,
        updatedPost,
      });
    }
  } catch (err) {
    return next(err);
  }
};
