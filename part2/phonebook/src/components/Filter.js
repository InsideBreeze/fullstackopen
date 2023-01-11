import React from "react";

const Filter = ({ filter, setFilter }) => {
  return (
    <>
      filter shown with{" "}
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
    </>
  );
};

export default Filter;
