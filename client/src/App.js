import React, { useState, useContext } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  concat,
  ApolloProvider,
  ApolloLink,
  HttpLink,
} from '@apollo/client';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// import components
import Nav from './components/Nav';
import Home from './pages/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Profile from './pages/auth/Profile';
import CompleteRegistration from './pages/auth/CompleteRegistration';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

import PasswordUpdate from './pages/auth/PasswordUpdate';
import PasswordForgot from './pages/auth/PasswordForgot';
import Post from './pages/post/Post';

import { AuthContext } from './context/authContext';

const App = () => {
  const { state } = useContext(AuthContext);
  const { user } = state;

  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  });

  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext({
      headers: {
        authtoken: user ? user.token : '',
      },
    });

    return forward(operation);
  });

  const client = new ApolloClient({
    cache: new InMemoryCache({
      addTypename: false,
    }),
    link: concat(authMiddleware, httpLink),
  });

  return (
    <ApolloProvider client={client}>
      <Nav />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <PublicRoute exact path="/register" component={Register} />
        <PublicRoute exact path="/login" component={Login} />
        <Route
          exact
          path="/complete-registration"
          component={CompleteRegistration}
        />
        <Route exact path="/password/forgot" component={PasswordForgot} />
        <PrivateRoute
          exact
          path="/password/update"
          component={PasswordUpdate}
        />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/post/create" component={Post} />
      </Switch>
    </ApolloProvider>
  );
};

export default App;
