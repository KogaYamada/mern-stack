const { gql } = require('apollo-server-express');
const { DateTimeResolver } = require('graphql-scalars');
const Post = require('../models/post');
const User = require('../models/user');

const { authCheck } = require('../helpers/auth');

const { posts } = require('../temp');

// queries

// mutations
const postCreate = async (parent, args, context) => {
  const currentUser = await authCheck(context.req);
  // validation
  if (args.input.content.trim() === '') throw new Error('Content is required');

  const currentUserFromDb = await User.findOne({ email: currentUser.email });
  let newPost = await new Post({
    ...args.input,
    postedBy: currentUserFromDb,
  })
    .save()
    .then((post) => post.populate('postedBy', '_id username').execPopulate())
    .catch((e) => console.log(e));
  return newPost;
};

const allPosts = async (parent, args) => {
  return await Post.find({}).populate('postedBy', 'username _id').exec();
};

const postByUser = async (parent, args, context) => {
  const currentUser = await authCheck(context.req);
  const currentUserFromDb = await User.findOne({
    email: currentUser.email,
  }).exec();

  return await Post.find({ postedBy: currentUserFromDb })
    .populate('postedBy', '_id username')
    .sort({ createdAt: -1 });
};

const postUpdate = async (parent, args, context) => {
  const currentUser = await authCheck(context.req);
  // validation
  if (args.input.content.trim() === '') throw new Error('Content is required');
  // get current user mongodb _id based in email
  const currentUserFromDb = await User.findOne({
    email: currentUser.email,
  }).exec();
  // _id of post to update
  const postToUpdate = await Post.findOne({ _id: args.input._id }).exec();
  // if currentUser id and id of the post's postedBy user id is same, allow update
  if (currentUserFromDb._id.toString() !== postToUpdate.postedBy._id.toString())
    throw new Error('unauthorized action');
  let updatedPost = await Post.findByIdAndUpdate(
    args.input._id,
    { ...args.input },
    { new: true }
  ).exec();

  return updatedPost;
};

module.exports = {
  Query: {
    allPosts,
    postByUser,
  },
  Mutation: {
    postCreate,
    postUpdate,
  },
};
