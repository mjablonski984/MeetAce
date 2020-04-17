import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import MeetingContext from '../../context/meeting/meetingContext';

const MeetingItem = ({ meeting }) => {
  const meetingContext = useContext(MeetingContext);
  const { deleteMeeting, setCurrent, clearCurrent } = meetingContext;

  const { _id, name, phone, email, date, time, description, type } = meeting;

  const onDelete = () => {
    deleteMeeting(_id);
    clearCurrent();
  };

  return (
    <div className="card light">
      <h3 className="text-primary">
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge primary ' + (type === 'professional' ? 'text-success' : 'text-light')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <div>
        {email && (
          <p>
            <i className="fas fa-envelope-open badge primary" /> {email}
          </p>
        )}
        {phone && (
          <p>
            <i className="fas fa-phone badge primary" /> {phone}
          </p>
        )}

        {date && (
          <p>
            <i className="fas fa-calendar-alt badge primary" /> {date}
          </p>
        )}
        {time && (
          <p>
            <i className="fas fa-clock badge primary" /> {time}
          </p>
        )}
        {description && (
          <p>
            <i className="fas fa-pen badge primary" /> {description}
          </p>
        )}
      </div>
      <p>
        <button className="btn dark btn-sm" onClick={() => setCurrent(meeting)}>
          Edit
        </button>
        <button className="btn danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

MeetingItem.propTypes = {
  meeting: PropTypes.object.isRequired
};

export default MeetingItem;
