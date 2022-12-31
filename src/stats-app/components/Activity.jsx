import { useState, useEffect } from 'react';

const Activity = ({ activity }) => {
  const [duration, setDuration] = useState();

  useEffect(() => {
    setDuration(Math.ceil((activity.start - activity.end) / 60));
  }, []);

  return (
    <div className='activity'>
      <div className='interval-name'>
        <div
          className='color-indicator'
          style={{ backgroundColor: activity.interval.color }}
        ></div>
        <p>{activity.subject.name}</p> | <b>{activity.interval.name}</b>
      </div>
      <div className='minutes-input'>
        <input type='number' value={duration} />
        <p>minutes</p>
      </div>
      <div className='btns'>
        <button className='update'>Update</button>
        <button className='delete'>Delete</button>
      </div>
    </div>
  );
};

export default Activity;
