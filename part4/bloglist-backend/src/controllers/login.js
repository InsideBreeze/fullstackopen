const express = require("express");
const loginRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// return a token
loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const passwordCorrect =
    user !== null && (await bcrypt.compare(password, user.passwordHash));
  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: "wrong username or password" });
  }
  const userForToken = {
    id: user._id,
    username: user.username,
  };
  const token = jwt.sign(userForToken, process.env.SECRET);
  res.status(200).json({ username, name: user.name, token });
});

module.exports = loginRouter;
