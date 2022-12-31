import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Activity from './Activity';
import { loadNewestTimerRecord } from './../../store/apps/timerRecordsActions';
import './Activities.css';

const Activities = () => {
  const dispatch = useDispatch();
  const newestTimerRecord = useSelector(
    state => state.apps.timerRecords.newestTimerRecord
  );

  useEffect(() => {
    dispatch(loadNewestTimerRecord());
  }, []);

  return (
    <div className='activities'>
      {newestTimerRecord &&
        newestTimerRecord.activities.map(activity => (
          <Activity key={activity._id} activity={activity} />
        ))}
    </div>
  );
};

export default Activities;
