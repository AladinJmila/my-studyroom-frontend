import { useState, useEffect } from 'react';
import {
  updateTimerRecord,
  loadVizData,
  loadNewestTimerRecord,
} from '../../store/apps/timerRecordsActions';
import { useDispatch } from 'react-redux';

const Activity = ({ activity, recordId }) => {
  useDispatch();
  const [duration, setDuration] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    setDuration(() => {
      return activity.end !== null
        ? Math.ceil((activity.start - activity.end) / 60)
        : 0;
    });
  }, []);

  const handleUpdate = () => {
    const newActivity = { ...activity };
    newActivity.start = duration * 60;
    newActivity.end = 0;
    dispatch(updateTimerRecord(newActivity, recordId, 'update'));
    dispatch(loadNewestTimerRecord());
    dispatch(loadVizData());
  };

  const handleDelete = () => {
    dispatch(updateTimerRecord(activity, recordId, 'delete'));
    dispatch(loadNewestTimerRecord());
    dispatch(loadVizData());
  };

  return (
    <>
      {Boolean(duration) && (
        <div className='activity'>
          <div className='interval-name'>
            <div
              className='color-indicator'
              style={{ backgroundColor: activity.interval.color }}
            ></div>
            <p>{activity.subject.name}</p> | <b>{activity.interval.name}</b>
          </div>
          <div className='time-logged'>{activity.timeLogged}</div>

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
            <button className='delete' onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Activity;
