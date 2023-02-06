const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const Book = require("./models/book");
const Author = require("./models/author");
require("dotenv").config();

mongoose.connect("mongodb+srv://zephyr:igvLyZ7gFAcsIw3j@cluster0.hci3l4e.mongodb.net/library?retryWrites=true&w=majority")
  .then(() => {
    console.log("connected to db.")
  })
  .catch((error) => {
    console.error("failed to connect to the db", error.message)
  });

let authors = [
  {
    name: "Robert Martin",
    id: "63e0a4070202d5c54411ccab",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "63e0a4070202d5c54411ccac",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "63e0a4070202d5c54411ccad",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", //birthyear not known
    id: "63e0a4070202d5c54411ccae",
  },
  {
    name: "Sandi Metz", //birthyear not known
    id: "63e0a4070202d5c54411ccaf",
  },
].map(author => ({ name: author.name, born: author.born }));

// authors.forEach(author => {
//   const authorObj = new Author(author);
//   authorObj.save().then(result => console.log(result.name));
// });

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "63e0a4070202d5c54411ccab",
    id: "63e0a4070202d5c54411ccab",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "63e0a4070202d5c54411ccab",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "63e0a4070202d5c54411ccac",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "63e0a4070202d5c54411ccae",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "63e0a4070202d5c54411ccaf",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "63e0a4070202d5c54411ccad",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "63e0a4070202d5c54411ccad",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
].map(book => ({ title: book.title, published: book.published, author: book.author, genres: book.genres }));

console.log(books);

books.forEach(author => {
  const authorObj = new Book(author);
  authorObj.save().then(result => console.log(result.title));
});
