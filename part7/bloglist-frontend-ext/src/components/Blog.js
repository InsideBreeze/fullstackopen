import blogService from "../services/blogs";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { initBlogs, likeBlog } from "../reducers/blogReducer";

const Blog = () => {
  const dispatch = useDispatch();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    dispatch(initBlogs());
  }, [])

  const id = useParams().id;
  const blog = useSelector(({ blogs }) =>
    blogs.find(blog => blog.id === id)
  )
  useEffect(() => {
    if (blog) {
      blogService.getAllComments(blog.id)
        .then(comments => setComments(comments));
    }
  }, [blog]);

  if (!blog) return null;

  const postComment = async (e) => {
    e.preventDefault();
    const postedComment = await blogService.postComment(blog.id, newComment);
    setComments(comments.concat(postedComment));
    setNewComment("");
  }

  return (
    <>
      <h2>{`${blog.title} ${blog.author}`}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a> <br />
        {blog.likes} <button onClick={() => dispatch(likeBlog(blog.id))}>like</button> <br />
        added by {blog?.user?.username}
      </div>
      <div>
        <h3>comments</h3>
        <form onSubmit={postComment}>
          <input value={newComment} onChange={(event) => setNewComment(event.target.value)} /> <button type="submit">add comment</button>
        </form>
        <ul>
          {comments.map(comment => <li key={comment.id}>{comment.comment}</li>)}
        </ul>
      </div>

    </>
  );
};

export default Blog;
