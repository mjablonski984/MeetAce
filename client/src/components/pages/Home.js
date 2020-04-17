import React, { useContext, useEffect } from 'react';
import Meetings from '../meetings/Meetings';
import MeetingsForm from '../meetings/MeetingForm';
import MeetingFilter from '../meetings/MeetingFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  // if token found and validated, load user (put into state) every time page loads
  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="section">
      <div>
        <MeetingsForm />
      </div>
      <div>
        <MeetingFilter />
        <Meetings />
      </div>
    </div>
  );
};

export default Home;
