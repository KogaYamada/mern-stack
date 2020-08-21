const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const http = require('http');
const path = require('path');
const {
  fileLoader,
  mergeTypes,
  mergeResolvers,
} = require('merge-graphql-schemas');
const mongoose = require('mongoose');

require('dotenv').config();
const { authCheck } = require('./helpers/auth');

// express server
const app = express();

// db
const db = async () => {
  try {
    const success = mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('DB connected');
  } catch (error) {
    console.log('DB connection error.', error);
  }
};

// excute database connection
db();

// typeDefs
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './typeDefs')));

// resolvers
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, './resolvers'))
);

//graphQL server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});

// applyMddleware method connects ApolloServer to a specific HTTP framework ie: express
apolloServer.applyMiddleware({ app });

// server
const httpserver = http.createServer(app);

// rest endpoint
app.get('/rest', authCheck, (req, res) => {
  res.json({
    data: 'you hit rest endpoint',
  });
});

app.get('/', (req, res) => {
  res.json({
    data: 'まいど',
  });
});

// port
app.listen(process.env.PORT, function () {
  console.log(`server is ready at http://localhost:${process.env.PORT}`);
  console.log(
    `graphQL server is ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`
  );
});
