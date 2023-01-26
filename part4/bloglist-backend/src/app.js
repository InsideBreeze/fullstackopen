const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./utils/config");
const blogRouter = require("./controllers/blogs");

const cors = require("cors");

mongoose.connect(config.DB_URL).then(() => {
  console.log(`connected to the db: ${config.DB_URL}`);
});

app.use(express.json());
app.use(cors());
app.use("/api/blogs", blogRouter);

module.exports = app;
