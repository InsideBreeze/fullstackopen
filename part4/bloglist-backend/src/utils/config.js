require("dotenv").config();
const DB_URL =
  process.env.NODE_ENV === "test"
    ? process.env.MONGODB_TEST_URL
    : process.env.MONGODB_URL;
const PORT = process.env.PORT;

module.exports = {
  DB_URL,
  PORT,
};
