import React from 'react';

const UserProfile = ({
  handleSubmit,
  handleChange,
  username,
  email,
  about,
  loading,
  handleImageChange,
}) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>User Name</label>
      <input
        type="text"
        name="username"
        value={username}
        onChange={handleChange}
        className="form-control"
        placeholder="User Name"
        disabled={loading}
      />
    </div>
    <div className="form-group">
      <label>Email</label>
      <input
        type="email"
        name="email"
        value={email}
        onChange={handleChange}
        className="form-control"
        placeholder="Email"
        disabled
      />
    </div>
    <div className="form-group">
      <label>Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="form-control"
        placeholder="Image"
      />
    </div>
    <div className="form-group">
      <label>About</label>
      <textarea
        name="about"
        value={about}
        onChange={handleChange}
        className="form-control"
        placeholder="About"
        disabled={loading}
      />
    </div>
    <button className="btn btn-primary" disabled={!email || loading}>
      Submit
    </button>
  </form>
);

export default UserProfile;
