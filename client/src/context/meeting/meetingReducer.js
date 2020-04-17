import {
  GET_MEETINGS,
  ADD_MEETING,
  DELETE_MEETING,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_MEETING,
  FILTER_MEETINGS,
  CLEAR_FILTER,
  MEETING_ERROR,
  CLEAR_MEETINGS
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_MEETINGS:
      return {
        ...state,
        meetings: action.payload,
        loading: false
      };
    case ADD_MEETING:
      return {
        ...state,
        meetings: [action.payload, ...state.meetings], // new meeting first
        loading: false
      };
    case UPDATE_MEETING:
      return {
        ...state,
        meetings: state.meetings.map((meeting) =>
          meeting._id === action.payload._id ? action.payload : meeting
        )
      };
    case DELETE_MEETING:
      return {
        ...state,
        meetings: state.meetings.filter((meeting) => meeting._id !== action.payload),
        loading: false
      };
    case CLEAR_MEETINGS:
      return {
        ...state,
        meetings: null,
        filtered: null,
        error: null,
        current: null
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };

    case FILTER_MEETINGS:
      return {
        ...state,
        filtered: state.meetings.filter((meeting) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return (
            meeting.name.match(regex) ||
            meeting.email.match(regex) ||
            meeting.date.match(regex) ||
            meeting.type.match(regex)
          );
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case MEETING_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
