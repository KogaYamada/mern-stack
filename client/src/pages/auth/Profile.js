import React, { useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useQuery, useMutation, gql } from '@apollo/client';
import UserProfile from '../../components/forms/UserProfile';
// fragment 使用不可
// import { PROFILE } from '../../graohql/queries';
// import { USER_UPDATE } from '../../graohql/mutations';

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

const USER_UPDATE = gql`
  mutation userUpdate($input: UserUpdateInput!) {
    userUpdate(input: $input) {
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
        ...values,
        username: data.profile.username,
        email: data.profile.email,
        name: data.profile.name,
        about: data.profile.about,
        images: data.profile.images,
      });
    }
  }, [data]);

  // mutation
  const [userUpdate] = useMutation(USER_UPDATE, {
    update: ({ data }) => {
      console.log('更新', data);
      toast.success('profile updated');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    userUpdate({ variables: { input: values } });
    setLoading(false);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImageChange = () => {};

  const { username, name, email, about, images } = values;

  return (
    <div className="container p-5">
      <UserProfile
        {...values}
        handleChange={handleChange}
        handleImageChange={handleImageChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Profile;
