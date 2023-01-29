const jwt = require("jsonwebtoken");
const User = require("../models/user");
const errorHandler = (error, req, res, next) => {
  if (error.name === 'ValidationError') {
    return res.status(400).send(error.message);
  }
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: "invalid token" });
  }
  next(error);
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    req.token = authorization.replace("Bearer ", "");
  }
  next()
}

const userExtractor = async (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    const token = authorization.replace("Bearer ", "");
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET);
      if (!decodedToken.id) {
        return res.status(401).json({ error: "Invalid token" })
      }
      const user = await User.findById(decodedToken.id);
      req.user = user
    } catch (error) {
      next(error)
    }
  }
  next();
}

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor,
}
