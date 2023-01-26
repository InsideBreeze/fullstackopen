const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, blog) => acc + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return [];
  return blogs.sort((blogA, blogB) => blogB.likes - blogA.likes)[0];
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return [];
  const blogsWithAuthor = Object.values(_.groupBy(blogs, "author"));
  const groupedBlogs = blogsWithAuthor.map((blogs) => ({
    author: blogs[0].author,
    blogs: blogs.length,
  }));
  return _.orderBy(groupedBlogs, "blogs", ["desc"])[0];
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return [];
  const blogsWithAuthor = Object.values(_.groupBy(blogs, "author"));
  const groupedBlogs = blogsWithAuthor.map((blogs) => ({
    author: blogs[0].author,
    likes: blogs.reduce((acc, blog) => acc + blog.likes, 0),
  }));
  return _.orderBy(groupedBlogs, "likes", ["desc"])[0];
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
