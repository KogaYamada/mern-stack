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
import CompleteRegistration from './pages/auth/CompleteRegistration';

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
    cache: new InMemoryCache(),
    link: concat(authMiddleware, httpLink),
  });

  return (
    <ApolloProvider client={client}>
      <Nav />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route
          exact
          path="/complete-registration"
          component={CompleteRegistration}
        />
      </Switch>
    </ApolloProvider>
  );
};

export default App;
