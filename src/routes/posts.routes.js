const posts = require("express").Router();
const postController = require("../controllers/posts.controller");

// get all posts
posts.get("/", postController.postsFetcher);

// get specific post
posts.get("/:postId", postController.specificPostFetcher);

// create new post
posts.post("/", postController.postCreator);

// update post
posts.put("/:postId", postController.postUpdater);

// delete post
posts.delete("/:postId", postController.postDestroyer);

module.exports = posts;
