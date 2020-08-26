import React from 'react';
import { Link } from 'react-router-dom';

const UserCard = ({ user }) => (
  <div className="clo-md-4 p-5" key={user._id}>
    <div className="card">
      <div className="card-body">
        <div className="card-title">
          <Link to={`/user/${user.username}`}>{user.username}</Link>
        </div>
        <p className="card-text">{user.about}</p>
      </div>
    </div>
  </div>
);

export default UserCard;
