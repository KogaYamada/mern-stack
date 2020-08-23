import React, { useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useQuery, useMutation, gql } from '@apollo/client';

const PROFILE = gql`
  query {
    profile {
      _id
      name
      username
      email
      images {
        url
        public_id
      }
      about
      createdAt
      updatedAt
    }
  }
`;

const Profile = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    name: '',
    about: '',
    images: [],
  });
  const [loading, setLoading] = useState(false);

  const { data } = useQuery(PROFILE);

  useMemo(() => {
    if (data) {
      console.log(data);
      setValues({
        username: data.profile.username,
        email: data.profile.email,
        name: data.profile.name,
        about: data.profile.about,
        images: data.profile.images,
      });
    }
  }, []);

  return <div className="container p-5">{JSON.stringify(values)}</div>;
};

export default Profile;
