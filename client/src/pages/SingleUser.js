import React from 'react';

import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';

import UserCard from '../components/UserCard';

const PUBLIC_PROFILE = gql`
  query publicProfile($username: String!) {
    publicProfile(username: $username) {
      _id
      name
      username
      email
      images {
        url
        public_id
      }
      about
    }
  }
`;

const SingleUser = () => {
  let params = useParams();
  const { data, loading } = useQuery(PUBLIC_PROFILE, {
    variables: { username: params.username },
  });

  if (loading) return <p className="p-5">Loading....</p>;
  return (
    <div className="container">
      <UserCard user={data.publicProfile} />
    </div>
  );
};

export default SingleUser;
