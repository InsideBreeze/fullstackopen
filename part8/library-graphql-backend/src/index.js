const { ApolloServer } = require("@apollo/server");
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const http = require("http");
const { expressMiddleware } = require("@apollo/server/express4");
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { makeExecutableSchema } = require("@graphql-tools/schema");
require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const typeDefs = require("./schema")
const resolvers = require("./resolvers");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");



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

const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/"
  });
  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugin: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            }
          }
        }
      }
    ]
  })
  await server.start();

  app.use(
    "/",
    cors(),
    json(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.startsWith("Bearer ")) {
          const token = auth.replace("Bearer ", "");
          const decodedToken = jwt.verify(token, process.env.SECRET);
          const currentUser = await User.findById(decodedToken.id);
          return { currentUser };
        }
      },
    })
  )
  const PORT = 4000;
  httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}`)
  })
}

start();
