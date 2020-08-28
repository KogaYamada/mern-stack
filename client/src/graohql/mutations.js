import { gql } from '@apollo/client';

import { USER_INFO } from './fragments';

export const USER_UPDATE = gql`
  mutation userUpdate($input: UserUpdateInput!) {
    userUpdate(input: $input) {
      ...userInfo
    }
  }
  ${USER_INFO}
`;

export const POST_CREATE = gql`
  mutation postCreate($input: PostCreateInput!) {
    postCreate(input: $input) {
      _id
      content
      image {
        url
        public_id
      }
      postedBy {
        _id
        username
      }
    }
  }
`;
