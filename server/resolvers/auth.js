const { gql } = require('apollo-server-express');

const me = () => 'koga';

module.exports = {
  Query: {
    me,
  },
};
