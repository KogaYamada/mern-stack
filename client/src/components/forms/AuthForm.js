import React from 'react';

const AuthForm = ({
  handleSubmit,
  email = '',
  password = '',
  setEmail = (f) => f,
  setPassword,
  loading,
  showPasswordInput = false,
  hideEmailInput = false,
}) => (
  <form onSubmit={handleSubmit}>
    {!hideEmailInput && (
      <div className="form-group">
        <label>Email address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          placeholder="Enter Email"
          disabled={loading}
        />
      </div>
    )}
    {showPasswordInput && (
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          placeholder="Enter Password"
          disabled={loading}
        />
      </div>
    )}
    <button className="btn btn-raised btn-primary" disabled={loading}>
      Submit
    </button>
  </form>
);

export default AuthForm;
