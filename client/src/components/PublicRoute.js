import React, { useEffect, useContext } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const PublicRoute = ({ children, ...rest }) => {
  const { state } = useContext(AuthContext);
  let history = useHistory();

  useEffect(() => {
    if (state.user) {
      history.push('/profile');
    }
  }, [state.user]);
  return <Route {...rest} />;
};

export default PublicRoute;
