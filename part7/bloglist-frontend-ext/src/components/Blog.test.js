import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("only render title and author", async () => {
  const blogForTest = {
    title: "test blog",
    author: "tester",
    url: "www.testblog.com",
  };
  render(<Blog blog={blogForTest} />);
  await screen.findByText(blogForTest.title);
  await screen.findByText(blogForTest.author);
});
