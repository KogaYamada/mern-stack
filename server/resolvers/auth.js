const { gql } = require('apollo-server-express');
const shortid = require('shortid');
const { DateTimeResolver } = require('graphql-scalars');
const { authCheck } = require('../helpers/auth');
const User = require('../models/user');

// contextはserver.jsのapolloServerのコンストラクター
const profile = async (parent, args, context) => {
  const currentUser = await authCheck(context.req);
  return User.findOne({ email: currentUser.email }).exec();
};

const userCreate = async (parent, args, context) => {
  const currentUser = await authCheck(context.req);
  // ユーザーがDBにいればユーザー情報をuserに代入
  const user = await User.findOne({ email: currentUser.email });
  return user
    ? user
    : new User({
        email: currentUser.email,
        username: shortid.generate(),
      }).save();
};

const userUpdate = async (parent, args, context) => {
  const currentUser = await authCheck(context.req);
  console.log(args);
  const updatedUser = await User.findOneAndUpdate(
    { email: currentUser.email },
    { ...args.input },
    { new: true }
  ).exec();
  return updatedUser;
};

module.exports = {
  Query: {
    profile,
  },
  Mutation: {
    userCreate,
    userUpdate,
  },
};
