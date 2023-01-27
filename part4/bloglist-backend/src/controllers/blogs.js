const express = require("express");
const blogRouter = express.Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogRouter.post("/", async (req, res) => {
  const { author, title, url, likes } = req.body;
  if (!(title && url)) {
    return res.status(400).send({ error: "missing title or url" });
  }
  const blogToAdd = { author, title, url, likes: likes || 0 };
  const blog = new Blog(blogToAdd);
  const addedBlog = await blog.save();
  res.status(201).json(addedBlog);
});

blogRouter.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    await Blog.findByIdAndRemove(id);
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
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });
    res.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
