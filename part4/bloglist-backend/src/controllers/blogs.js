const express = require("express");
const blogRouter = express.Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user");
  res.json(blogs);
});

blogRouter.post("/", async (req, res) => {
  const { author, title, url, likes } = req.body;
  const user = req.user;

  // no token provided
  if (!user) {
    return res.status(401).json({ error: "need token to operate" })
  }

  if (!(title && url)) {
    return res.status(400).send({ error: "missing title or url" });
  }
  const blogToAdd = { author, title, url, likes: likes || 0, user: user._id };
  const blog = new Blog(blogToAdd);
  const addedBlog = await blog.save();
  user.blogs = user.blogs.concat(addedBlog);
  await user.save();
  res.status(201).json(addedBlog);
});

blogRouter.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  const user = req.user;
  // no token provided
  if (!user) {
    return res.status(401).json({ error: "need token" })
  }

  const blogToDelete = await Blog.findById(id);
  // if the blog is not created by this user, return 403
  if (!blogToDelete || blogToDelete.user.toString() !== user._id.toString()) {
    return res.status(403).json({ error: "you are not qualified to delete this blog" });
  }
  try {
    await Blog.findByIdAndRemove(id);
    user.blogs = user.blogs.filter(blog => blog.toString() !== id);
    await user.save();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogRouter.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  const blog = {
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes,
  };
  const user = req.user;
  if (!user) {
    return res.status(401).json({ error: "need token" })
  }
 
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });
    res.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
