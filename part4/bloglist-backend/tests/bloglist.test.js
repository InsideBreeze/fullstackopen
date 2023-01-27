const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../src/app");
const Blog = require("../src/models/blog");
const api = supertest(app);

jest.setTimeout(100000);
const bloglistHelper = require("../src/utils/bloglist_test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = bloglistHelper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe("test get method", () => {
  test("test content-type", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("test amount of returned blogs", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(bloglistHelper.initialBlogs.length);
  });
});

describe("test id", () => {
  test("id is defined", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });
});

describe("test post method", () => {
  test("post blog", async () => {
    const newBlog = {
      author: "J.K Rowling",
      title: "Harry Potter",
      url: "www.harrypotter.com",
      likes: 10,
    };
    const blogsAtStart = await bloglistHelper.blogsInDB();
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await bloglistHelper.blogsInDB();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1);
    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain(newBlog.title);
  });

  test("test defalt likes is 0", async () => {
    const blogWithoutLikes = {
      author: "J.K Rowling",
      title: "Harry Potter",
      url: "www.harrypotter.com",
    };
    const response = await api.post("/api/blogs").send(blogWithoutLikes);
    expect(response.body.likes).toBeDefined();
    expect(response.body.likes).toBe(0);
  });

  test("test title is required", async () => {
    const blogWithoutTitle = {
      author: "J.K Rowling",
      url: "www.harrypotter.com",
      likes: 10,
    };
    await api.post("/api/blogs").send(blogWithoutTitle).expect(400);
  });

  test("test url is required", async () => {
    const blogWithoutUrl = {
      author: "J.K Rowling",
      title: "Harry Potter",
      likes: 10,
    };
    await api.post("/api/blogs").send(blogWithoutUrl).expect(400);
  });
});

describe("test delete method", () => {
  test("delete", async () => {
    const blogsAtStart = await bloglistHelper.blogsInDB();
    const titleToDelete = blogsAtStart[0].title;
    await api.delete(`/api/blogs/${blogsAtStart[0].id}`).expect(204);
    const blogsAtEnd = await bloglistHelper.blogsInDB();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);
    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).not.toContain(titleToDelete);
  });
});

describe("test update function", () => {
  test("update likes", async () => {
    const blogsAtStart = await bloglistHelper.blogsInDB();
    const blogToUpdate = blogsAtStart[0];
    const response = await api.put(`/api/blogs/${blogToUpdate.id}`).send({
      url: blogToUpdate.url,
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      likes: blogToUpdate.likes + 1,
    });
    expect(response.body.likes).toBe(blogToUpdate.likes + 1);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
