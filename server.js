const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const typeDefs = require("./graphql/typeDefs.js");
const employeeResolvers = require("./graphql/employeeResolvers");
const userResolvers = require("./graphql/userResolvers");
const mongoDBConnect = require("./mongoDB.js");
const PORT = process.env.PORT || 4000;



async function startServer() {
  try {
    await mongoDBConnect();
    const app = express();

    const server = new ApolloServer({
      typeDefs,
      resolvers: [employeeResolvers, userResolvers],
    });

    await server.start();
    server.applyMiddleware({ app });

    app.listen(PORT, () => {
      console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1); // Exit with error status
  }
}

startServer();
