import { gql } from '@apollo/client';

import { USER_INFO } from './fragments';

// export const PROFILE = gql`
//   query {
//     profile {
//       ...userInfo
//     }
//   }
//   ${USER_INFO}
// `;
export const PROFILE = gql`
  query {
    profile {
      _id
      name
      username
      email
      images {
        url
        public_id
      }
      about
      createdAt
      updatedAt
    }
  }
`;

export const GET_ALL_POSTS = gql`
  {
    allPosts {
      _id
      title
      description
    }
  }
`;

export const ALL_USERS = gql`
  query {
    allUsers {
      _id
      name
      username
      email
      images {
        url
        public_id
      }
      about
      createdAt
      updatedAt
    }
  }
`;
