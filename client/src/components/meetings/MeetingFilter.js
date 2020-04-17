import React, { useContext, useRef, useEffect } from 'react';
import MeetingContext from '../../context/meeting/meetingContext';

const MeetingFilter = () => {
  const meetingContext = useContext(MeetingContext);
  const text = useRef('');

  const { filterMeetings, clearFilter, filtered } = meetingContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    text.current.value !== '' ? filterMeetings(e.target.value) : clearFilter();
  };

  return (
    <form>
      <input ref={text} type="text" placeholder="Filter Meetings..." onChange={onChange} />
    </form>
  );
};

export default MeetingFilter;
