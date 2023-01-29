const express = require("express");
const bcrypt = require("bcrypt")
const User = require("../models/user");
const userRouter = express.Router();

userRouter.post("/", async (req, res, next) => {
  const { username, name, password } = req.body;
  if (!(username && password)) {
    return res.status(400).send({ error: "username and password must be given" });
  }
  if (password.length < 3 || username.length < 3) {
    return res.status(400).send({ error: "the length of username and password must be at least 3" });
  }

  const salt = 10;
  const passwordHash = await bcrypt.hash(password, salt);
  try {
    const user = new User({ username, name, passwordHash });
    const addedUser = await user.save();
    res.status(201).json(addedUser);

  } catch (error) {
    next(error)
  }
})

userRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", { url: 1, author: 1, title: 1 });
  res.json(users);
})

module.exports = userRouter;
