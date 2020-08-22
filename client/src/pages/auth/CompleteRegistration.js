import React, { useState, useEffect, useContext } from 'react';
import { useMutation, gql } from '@apollo/client';
import { auth } from '../../firebase';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/authContext';
import AuthForm from '../../components/forms/AuthForm';

const USER_CREATE = gql`
  mutation userCreate {
    userCreate {
      username
      email
    }
  }
`;

const CompleteRegistration = () => {
  const { dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  let history = useHistory();

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailFormRagistoration'));
  }, [history]);

  // graphQL mutation
  const [userCreate] = useMutation(USER_CREATE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
      toast.error('Email and password is required');
      return;
    }
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        // remove form email local storage
        window.localStorage.removeItem('emailFormRagistoration');
        let user = auth.currentUser;
        await user.updatePassword(password);

        // dispatch user with token and email
        // then redirect
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
        // make api request to save/update user in mongodb
        userCreate();
        history.push('/profile');
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="container p-5">
      {loading ? (
        <h4 className="text-danger">Loading...</h4>
      ) : (
        <h4>Complete your registration</h4>
      )}
      <AuthForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        loading={loading}
        handleSubmit={handleSubmit}
        showPasswordInput
      />
    </div>
  );
};
export default CompleteRegistration;
