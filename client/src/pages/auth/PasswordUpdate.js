import React, { useState } from 'react';
import firebase, { auth } from '../../firebase';
import { toast } from 'react-toastify';
import AuthForm from '../../components/forms/AuthForm';

const PasswordUpdate = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        toast.success('password updated');
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        toast.error(e.message);
      });
  };
  return (
    <div className="container p-5">
      {loading ? <h4>Loading...</h4> : <h4>Password update</h4>}
      <AuthForm
        password={password}
        setPassword={setPassword}
        loading={loading}
        handleSubmit={handleSubmit}
        showPasswordInput
        hideEmailInput
      />
    </div>
  );
};

export default PasswordUpdate;
