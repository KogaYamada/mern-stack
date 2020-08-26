import React, { useState, useContext } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  gql,
  useQuery,
  useLazyQuery,
} from '@apollo/client';
import { AuthContext } from '../context/authContext';
import { useHistory } from 'react-router-dom';
import { ALL_USERS } from '../graohql/queries';
import UserCard from '../components/UserCard';

const Users = () => {
  const { data, loading, error } = useQuery(ALL_USERS);
  console.log(data);

  if (loading) return <p className="p-5">Loading....</p>;
  return (
    <div className="container">
      <div className="row">
        {data &&
          data.allUsers.map((u) => {
            return <UserCard user={u} />;
          })}
      </div>
    </div>
  );
};

export default Users;
