const { gql } = require('apollo-server-express');
const { DateTimeResolver } = require('graphql-scalars');

const { authCheck } = require('../helpers/auth');

const { posts } = require('../temp');

// queries
const totalPosts = () => posts.length;
// contextはserver.jsのapolloServerのコンストラクター
const allPosts = async (parent, args, context) => {
  await authCheck(context.req);
  return posts;
};

// mutations
const newPost = (parrent, args, context) => {
  console.log(args);
  // create a new post object
  const post = {
    id: posts.length + 1,
    ...args.input,
  };

  // push new post object to posts array
  posts.push(post);

  return post;
};

module.exports = {
  Query: {
    totalPosts,
    allPosts,
  },
  Mutation: {
    newPost,
  },
};
