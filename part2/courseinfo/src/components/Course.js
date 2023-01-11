import React from "react";
import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

const Course = ({ course }) => {
  const total = course.parts.reduce((acc, prev) => acc + prev.exercises, 0);
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total total={total} />
    </>
  );
};

export default Course;
