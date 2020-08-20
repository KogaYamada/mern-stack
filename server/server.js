const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const http = require('http');

require('dotenv').config();

// express server
const app = express();

//types  query/mutation/subscription
const typeDefs = `
  type Query {
    totalPosts: Int!
  }
`;

//resolvers
const resolvers = {
  Query: {
    totalPosts: () => 42,
  },
};

//graphQL server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

// applyMddleware method connects ApolloServer to a specific HTTP framework ie: express
apolloServer.applyMiddleware({ app });

// server
const httpserver = http.createServer(app);

// rest endpoint
app.get('/rest', (req, res) => {
  res.json({
    data: 'you hit rest endpoint',
  });
});

// port
app.listen(process.env.PORT, function () {
  console.log(`server is ready at http://localhost:${process.env.PORT}`);
  console.log(
    `graphQL server is ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`
  );
});