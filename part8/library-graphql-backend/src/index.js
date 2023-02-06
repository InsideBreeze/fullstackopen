const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
const { GraphQLError } = require("graphql");

mongoose.set("strictQuery", true);

// connect to the mongodb
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("connected to db.");
  })
  .catch((error) => {
    console.error("failed to connect to the db", error.message);
  });

const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!,
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favouriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
}
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    me: (root, _, { currentUser }) => currentUser,
    allBooks: async (_, args) => {
      const { author, genre } = args;
      if (author && genre) {
        return Book.find({ author, genres: genre });
      }
      if (!(author || genre)) {
        return Book.find({});
      }
      // only author provided
      if (author) {
        const authorToFind = await Author.findOne({ name: author });
        if (!authorToFind) {
          return null;
        }
        return Book.find({ author: authorToFind._id });
      }
      // only genre provided
      return Book.find({ genres: genre });
    },
    allAuthors: async () => Author.find({}),
  },
  Author: {
    bookCount: async (root) => {
      const authorInDB = await Author.findOne({ name: root.name });
      if (authorInDB) {
        const books = await Book.find({ author: authorInDB._id });
        return books.length;
      }
    },
  },
  Mutation: {
    addBook: async (_, args, { currentUser }) => {
      if (!currentUser) {
        throw GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT"
          }
        })
      }
      const { title, author, published, genres } = args;
      let authorInDB = await Author.findOne({ name: author });
      if (!authorInDB) {
        try {
          const authorObject = new Author({ name: author });
          authorInDB = await authorObject.save();
        } catch (error) {
          throw new GraphQLError("the name of author is too short", {
            extensions: {
              code: "BAD_USER_INPUT",
            },
          });
        }
      }
      try {
        const newBook = new Book({
          title,
          author: authorInDB._id,
          published,
          genres,
        });
        return newBook.save();
      } catch (error) {
        throw new GraphQLError("the title of book is too short", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: title,
          },
        });
      }
    },
    editAuthor: async (_, args, { currentUser }) => {
      if (!currentUser) {
        throw GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT"
          }
        })
      }
      const { name, setBornTo } = args;
      const authorToUpdate = await Author.findOne({ name });
      if (authorToUpdate) {
        authorToUpdate.born = setBornTo;
        return authorToUpdate.save();
      }
    },
    createUser: async (_, { username, favouriteGenre }) => {
      const user = new User({ username, favouriteGenre });
      return user.save().catch(error => {
        throw new GraphQLError("failed to create user", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: username,
            error
          }
        })
      })
    },
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user || password !== "password") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT"
          }
        })
      }
      const userForToken = {
        username: user.username,
        id: user._id
      }
      const token = jwt.sign(userForToken, process.env.SECRET);
      return { value: token }
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const token = auth.replace("Bearer ", "");
      const decodedToken = jwt.verify(token, process.env.SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
