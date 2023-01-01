import { useState, useEffect } from 'react';
import { updateTimerRecord } from '../../store/apps/timerRecordsActions';
import { useDispatch } from 'react-redux';
import { loadVizData } from './../../store/apps/timerRecordsActions';

const Activity = ({ activity, recordId }) => {
  useDispatch();
  const [duration, setDuration] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    setDuration(Math.ceil((activity.start - activity.end) / 60));
  }, []);

  const handleUpdate = () => {
    const newActivity = { ...activity };
    newActivity.start = duration * 60;
    newActivity.end = 0;
    dispatch(updateTimerRecord(newActivity, recordId));
    // dispatch(loadVizData());
  };

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
        <input
          type='number'
          value={duration}
          onChange={e => setDuration(e.target.value)}
        />
        <p>minutes</p>
      </div>
      <div className='btns'>
        <button className='update' onClick={handleUpdate}>
          Update
        </button>
        <button className='delete'>Delete</button>
      </div>
    </div>
  );
};

export default Activity;
