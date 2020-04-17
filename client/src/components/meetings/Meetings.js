import React, { Fragment, useContext, useEffect } from 'react';
import MeetingItem from './MeetingItem';
import MeetingContext from '../../context/meeting/meetingContext';
import Loader from '../layout/Loader';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Meetings = () => {
  const meetingContext = useContext(MeetingContext);

  const { meetings, filtered, getMeetings, loading } = meetingContext;

  useEffect(() => {
    getMeetings();
    // eslint-disable-next-line
  }, []);

  if (meetings !== null && meetings.length === 0 && !loading) {
    return <h4>Meeting list is empty</h4>;
  }

  return (
    <Fragment>
      {meetings !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((meeting) => (
                <CSSTransition key={meeting._id} timeout={500} classNames="item">
                  <MeetingItem meeting={meeting} />
                </CSSTransition>
              ))
            : meetings.map((meeting) => (
                <CSSTransition key={meeting._id} timeout={500} classNames="item">
                  <MeetingItem meeting={meeting} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Loader />
      )}
    </Fragment>
  );
};

export default Meetings;
