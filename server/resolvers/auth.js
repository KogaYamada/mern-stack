const { gql } = require('apollo-server-express');
const { authCheck } = require('../helpers/auth');

// contextはserver.jsのapolloServerのコンストラクター
const me = async (parent, args, context) => {
  await authCheck(context.req);
  return 'koga';
};

module.exports = {
  Query: {
    me,
  },
};
