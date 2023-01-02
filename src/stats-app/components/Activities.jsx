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
  const vizData = useSelector(state => state.apps.timerRecords.vizData);

  useEffect(() => {
    dispatch(loadNewestTimerRecord());
  }, [vizData]);

  return (
    <div className='activities'>
      {newestTimerRecord &&
        newestTimerRecord.activities.map(activity => (
          <Activity
            key={activity._id}
            activity={activity}
            recordId={newestTimerRecord._id}
          />
        ))}
    </div>
  );
};

export default Activities;
