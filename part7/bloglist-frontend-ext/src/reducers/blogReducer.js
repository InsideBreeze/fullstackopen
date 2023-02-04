import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(_, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    deleteBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload);
    },
    updateBlog(state, action) {
      return state.map(blog => blog.id === action.payload.id ? action.payload : blog);
    }
  }
})

export const { setBlogs, appendBlog, deleteBlog, updateBlog } = blogSlice.actions;
export default blogSlice.reducer;

export const initBlogs = () => (async (dispatch) => {
  const blogs = await blogService.getAll();
  dispatch(setBlogs(blogs));
})

export const addBlog = (newBlog) => (async (dispatch) => {
  const addedBlog = await blogService.createBlog(newBlog);
  dispatch(appendBlog(addedBlog));
})

export const removeBlog = (id) => (async (dispatch) => {
  try {
    await blogService.removeBlog(id);
    dispatch(deleteBlog(id));
  } catch (error) {
    console.log(error.message);
  }
})

export const likeBlog = (id) => (async (dispatch, getState) => {
  try {
    const blogs = getState().blogs;
    const blogToUpdate = blogs.find(blog => blog.id === id);
    const updatedBlog = await blogService.updateBlog(id, { ...blogToUpdate, likes: blogToUpdate.likes + 1 });
    dispatch(updateBlog(updatedBlog));
  } catch (error) {
    console.log(error.message)
  }
})
