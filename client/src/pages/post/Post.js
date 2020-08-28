import React, { useState, useContext, useEffect, Fragment } from 'react';
import { toast } from 'react-toastify';
import { useQuery, useMutation } from '@apollo/client';
import { AuthContext } from '../../context/authContext';

const initialState = {
  content: '',
  image: {
    url: 'https://via.placeholder.com/200x200.png?text=post',
    public_id: '123',
  },
};

const Post = () => {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {};

  const handleChange = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const createForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <textarea
          value={values.content}
          onChange={handleChange}
          name="content"
          className="md-textarea form-control"
          placeholder="Write something cool"
          maxLength="150"
          disabled={loading}></textarea>
        <button
          className="btn btn-primary"
          type="submit"
          disabled={loading || !values.content}>
          Post
        </button>
      </div>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        {loading ? (
          <h4 className="text-danger">Loading...</h4>
        ) : (
          <h4>Create</h4>
        )}
        {createForm()}
      </div>
      <hr />
      {JSON.stringify(values.content)}
    </div>
  );
};

export default Post;
