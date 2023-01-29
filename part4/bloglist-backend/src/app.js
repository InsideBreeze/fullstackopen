const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./utils/config");
const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
require("express-async-errors");
const middleware = require("./utils/middleware");

const cors = require("cors");

mongoose.connect(config.DB_URL).then(() => {
  console.log(`connected to the db: ${config.DB_URL}`);
});

app.use(express.json());
app.use(cors());
app.use(middleware.tokenExtractor);
app.use("/api/blogs", middleware.userExtractor, blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

app.use(middleware.errorHandler)

module.exports = app;
