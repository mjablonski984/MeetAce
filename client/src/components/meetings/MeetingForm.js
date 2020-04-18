import React, { useState, useContext, useEffect } from 'react';
import MeetingContext from '../../context/meeting/meetingContext';
import AlertContext from '../../context/alert/alertContext';
import Alerts from '../layout/Alerts';

const MeetingForm = () => {
  const meetingContext = useContext(MeetingContext);
  const { addMeeting, updateMeeting, current, clearCurrent } = meetingContext;
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  useEffect(() => {
    if (current !== null) {
      setMeeting(current);
    } else {
      setMeeting({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        description: '',
        type: 'personal'
      });
    }
  }, [meetingContext, current]);

  const [meeting, setMeeting] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    description: '',
    type: 'personal'
  });

  const onChange = (e) => setMeeting({ ...meeting, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    const phoneRegex = /^\+*(\d{3})*[0-9,\- ]{8,}$/.test(phone);
    const dateRegex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(date);
    const timeRegex = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(time);

    if (meeting.name === '' || !phoneRegex || !dateRegex || !timeRegex) {
      if (!phoneRegex) setAlert('Please enter a valid phone number', 'danger');
      if (!dateRegex) setAlert('Please enter a valid date: YYYY:MM:DD', 'danger');
      if (!timeRegex) setAlert('Please enter a valid time: HH:MM', 'danger');

      return;
    }
    // create new or update  exisiting meeting
    current === null ? addMeeting(meeting) : updateMeeting(meeting);

    clearAll();
  };

  const clearAll = () => clearCurrent();

  const { name, phone, email, date, time, description, type } = meeting;

  return (
    <form onSubmit={onSubmit}>
      <Alerts />
      <h2>{current ? 'Update Meeting' : 'Add Meeting'}</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={name}
        onChange={onChange}
        required
        maxLength="40"
      />
      <input type="email" name="email" placeholder="Email" value={email} onChange={onChange} />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={phone}
        onChange={onChange}
        required
      />
      <input
        type="text"
        name="date"
        placeholder="Date YYYY-MM-DD"
        value={date}
        onChange={onChange}
        required
      />
      <input
        type="text"
        name="time"
        placeholder="Time HH:MM"
        value={time}
        onChange={onChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={description}
        onChange={onChange}
        rows="4"
        maxLength="200"
      />
      <p className="radio-row">
        Meeting Type:&nbsp;&nbsp;&nbsp;
        <label htmlFor="personal">
          {' '}
          <input
            type="radio"
            name="type"
            value="personal"
            checked={type === 'personal'}
            onChange={onChange}
          />{' '}
          Personal{' '}
        </label>
        <label htmlFor="professional">
          {' '}
          <input
            type="radio"
            name="type"
            value="professional"
            checked={type === 'professional'}
            onChange={onChange}
          />{' '}
          Professional{' '}
        </label>
      </p>
      <div>
        <input
          type="submit"
          value={current ? 'Update Meeting' : 'Add Meeting'}
          className="btn dark btn-block"
        />
      </div>
      <br />
      {current && (
        <div>
          <input
            type="button"
            className="btn light btn-block"
            value="Clear"
            onClick={clearAll}
          />
        </div>
      )}
    </form>
  );
};

export default MeetingForm;
