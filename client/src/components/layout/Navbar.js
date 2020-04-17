import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import MeetingContext from '../../context/meeting/meetingContext';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const meetingContext = useContext(MeetingContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearMeetings } = meetingContext;

  const onLogout = () => {
    logout();
    clearMeetings();
  };

  const authLinks = (
    <Fragment>
      <li>
        Hello{' '}
        <span className="text-success">
          <strong>
            {user && user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase()}
          </strong>
        </span>
      </li>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <a href="#!" onClick={onLogout}>
          <i className="fas fa-sign-out-alt"></i> <span className="hide-sm"> Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </Fragment>
  );
  return (
    <div className="bar">
      <nav className="nav">
        <h1>
          <span className="text-success">meetAce</span>
        </h1>
        <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
      </nav>
    </div>
  );
};

export default Navbar;
