const Book = require("./models/book");
const Author = require("./models/author");
const { GraphQLError } = require("graphql");
const User = require("./models/user");
const { PubSub } = require("graphql-subscriptions");
const jwt = require("jsonwebtoken");

const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    me: (root, _, { currentUser }) => currentUser,
    allBooks: async (_, args) => {
      const { author, genre } = args;
      if (author && genre) {
        return Book.find({ author, genres: genre }).populate("author");
      }
      if (!(author || genre)) {
        return Book.find({}).populate("author");
      }
      // only author provided
      if (author) {
        const authorToFind = await Author.findOne({ name: author });
        if (!authorToFind) {
          return null;
        }
        return Book.find({ author: authorToFind._id }).populate("author");
      }
      // only genre provided
      return Book.find({ genres: genre }).populate("author");
    },
    allAuthors: async () => Author.find({}),
  },
  Mutation: {
    addBook: async (_, args, { currentUser }) => {
      // if user is not logged
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT"
          }
        })
      }
      const { title, author, published, genres } = args;
      let authorInDB = await Author.findOne({ name: author });
      const newBook = new Book({
        title,
        author: authorInDB._id,
        published,
        genres,
      });
      // if author is new
      if (!authorInDB) {
        try {
          const authorObject = new Author({ name: author });
        } catch (error) {
          throw new GraphQLError("the name of author is too short", {
            extensions: {
              code: "BAD_USER_INPUT",
            },
          });
        }
      }
      try {
        authorInDB.bookCount += 1;
        // update author and books
        await authorInDB.save();
        await newBook.save()
      } catch (error) {
        throw new GraphQLError("the title of book is too short", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: title,
          },
        });
      }
      const book = newBook.populate("author")

      // args: event_label, payload
      pubsub.publish("BOOK_ADDED", { bookAdded: book })
      return book;
    },
    editAuthor: async (_, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
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
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED")
    }
  }
};

module.exports = resolvers;
