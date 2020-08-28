import React, { useState, useContext, useEffect, Fragment } from 'react';
import { toast } from 'react-toastify';
import { useQuery, useMutation } from '@apollo/client';
import { AuthContext } from '../../context/authContext';
import { POST_CREATE } from '../../graohql/mutations';
import { POST_BY_USER } from '../../graohql/queries';

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
  // query
  const { data: posts } = useQuery(POST_BY_USER);

  // mutation
  const [postCreate] = useMutation(POST_CREATE, {
    // update cache
    update: (cache, { data: { postCreate } }) => {
      // read Query from cache
      const { postByUser } = cache.readQuery({
        query: POST_BY_USER,
      });
      // write Query to cache
      cache.writeQuery({
        query: POST_BY_USER,
        data: {
          postByUser: [postCreate, ...postByUser],
        },
      });
    },
    onError: (err) => console.log(err),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    postCreate({ variables: { input: values } });
    setValues(initialState);
    setLoading(false);
    toast.success('post created');
  };

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
      {posts &&
        posts.postByUser.map((p) => {
          return (
            <div className="clo-md-4 p-5" key={p._id}>
              <div className="card">
                <div className="card-body">
                  <div className="card-title">
                    <h4>@{p.postedBy && p.postedBy.username}</h4>
                  </div>
                  <p className="card-text">{p.content}</p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Post;
