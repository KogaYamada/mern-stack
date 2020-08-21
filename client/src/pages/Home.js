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

const GET_ALL_POSTS = gql`
  {
    allPosts {
      id
      title
      description
    }
  }
`;

const Home = () => {
  const { data, loading, error } = useQuery(GET_ALL_POSTS);
  const [fetchPosts, { data: posts }] = useLazyQuery(GET_ALL_POSTS);
  // action context
  const { state, dispatch } = useContext(AuthContext);

  // react router
  let history = useHistory();

  const updateUsername = () => {
    dispatch({
      type: 'LOGGED_IN_USER',
      payload: 'koga',
    });
  };

  if (loading) return <p className="p-5">Loading....</p>;
  return (
    <div className="container">
      <div className="row">
        {data &&
          data.allPosts.map((p) => {
            return (
              <div className="clo-md-4 p-5" key={p.id}>
                <div className="card">
                  <div className="card-body">
                    <div className="card-title">
                      <h4>{p.title}</h4>
                    </div>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="row p-5">
        <button
          onClick={() => fetchPosts()}
          className="btn-btn-raised btn-primary">
          Fetch posts
        </button>
      </div>
      <hr />
      {JSON.stringify(posts)}
      <hr />
      {JSON.stringify(state.user)}
      <button className="btn btn-primary" onClick={updateUsername}>
        change user name
      </button>
    </div>
  );
};

export default Home;
