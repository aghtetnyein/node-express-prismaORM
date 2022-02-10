const { PrismaClient } = require("@prisma/client");
const { post, user } = new PrismaClient();

// get all posts
const postsFetcher = async (req, res) => {
  const posts = await post.findMany();

  if (!posts) {
    res.status(404).json({
      message: "Posts not found",
    });
  }

  res.status(200).json({
    message: "Posts fetched successfully",
    data: posts,
  });
};

// get specific post
const specificPostFetcher = async (req, res) => {
  const specificPost = await post.findUnique({
    where: {
      id: Number(req.params.postId),
    },
    select: {
      id: true,
      title: true,
      body: true,
      user: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!specificPost) {
    res.status(404).json({
      message: "Post not found",
    });
  }

  res.status(200).json({
    message: "Post found",
    data: specificPost,
  });
};

// create new post
const postCreator = async (req, res) => {
  const { title, body, userId } = req.body;

  const userExists = await user.findUnique({
    where: {
      id: Number(userId),
    },
  });

  if (!userExists) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  const newPost = await post.create({
    data: {
      title,
      body,
      userId,
    },
  });

  res.status(201).json({
    message: "Post created successfully",
    data: newPost,
  });
};

// update post
const postUpdater = async (req, res) => {
  const { title, body } = req.body;

  const specificPost = await post.findUnique({
    where: {
      id: Number(req.params.postId),
    },
  });

  if (!specificPost) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const updatedPost = await post.update({
    where: {
      id: Number(req.params.postId),
    },
    data: {
      title,
      body,
    },
  });

  res.status(200).json({
    message: "Post updated successfully",
    data: updatedPost,
  });
};

// post destroyer
const postDestroyer = async (req, res) => {
  const specificPost = await post.findUnique({
    where: {
      id: Number(req.params.postId),
    },
  });

  if (!specificPost) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const destroyedPost = await post.delete({
    where: {
      id: Number(req.params.postId),
    },
  });

  res.status(200).json({
    message: "Post destroyed successfully",
    data: destroyedPost,
  });
};

const postController = {
  postsFetcher,
  specificPostFetcher,
  postCreator,
  postUpdater,
  postDestroyer,
};

module.exports = postController;
