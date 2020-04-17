import React, { useReducer } from 'react';
import axios from 'axios';
import MeetingContext from './meetingContext';
import meetingReducer from './meetingReducer';
import {
  GET_MEETINGS,
  ADD_MEETING,
  DELETE_MEETING,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_MEETING,
  FILTER_MEETINGS,
  CLEAR_MEETINGS,
  CLEAR_FILTER,
  MEETING_ERROR
} from '../types';

const MeetingState = (props) => {
  const initialState = {
    meetings: [],
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(meetingReducer, initialState);

  // Get Meetings from db
  const getMeetings = async () => {
    try {
      const res = await axios.get('/api/meetings');
      dispatch({ type: GET_MEETINGS, payload: res.data });
    } catch (err) {
      dispatch({ type: MEETING_ERROR, payload: err.response.msg });
    }
  };

  // Add Meeting
  const addMeeting = async (meeting) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post('/api/meetings', meeting, config);
      // res.data is a responce from the server containing sent meeting
      dispatch({ type: ADD_MEETING, payload: res.data });
    } catch (err) {
      dispatch({ type: MEETING_ERROR, payload: err.response.msg });
    }
  };

  // Update Meeting
  const updateMeeting = async (meeting) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`/api/meetings/${meeting._id}`, meeting, config);
      dispatch({ type: UPDATE_MEETING, payload: res.data });
    } catch (err) {
      dispatch({ type: MEETING_ERROR, payload: err.response.msg });
    }
  };

  // Delete Meeting
  const deleteMeeting = async (id) => {
    try {
      await axios.delete(`/api/meetings/${id}`);
      dispatch({ type: DELETE_MEETING, payload: id });
    } catch (err) {
      dispatch({ type: MEETING_ERROR, payload: err.response.msg });
    }
  };

  const setCurrent = (meeting) => dispatch({ type: SET_CURRENT, payload: meeting });

  const clearCurrent = () => dispatch({ type: CLEAR_CURRENT });

  const clearMeetings = () => dispatch({ type: CLEAR_MEETINGS });

  const filterMeetings = (text) => dispatch({ type: FILTER_MEETINGS, payload: text });

  const clearFilter = () => dispatch({ type: CLEAR_FILTER });

  return (
    <MeetingContext.Provider
      value={{
        meetings: state.meetings,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getMeetings,
        addMeeting,
        updateMeeting,
        deleteMeeting,
        setCurrent,
        clearCurrent,
        filterMeetings,
        clearFilter,
        clearMeetings
      }}
    >
      {props.children}
    </MeetingContext.Provider>
  );
};

export default MeetingState;
