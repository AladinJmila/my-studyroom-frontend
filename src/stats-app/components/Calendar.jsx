import CalendarDay from './CalendarDay';
import { useEffect } from 'react';
import { loadDailyDurations } from '../../store/apps/timerRecordsActions';
import { useDispatch, useSelector } from 'react-redux';

const Calendar = () => {
  const daysPerYear = 365;
  const { dailyDurations } = useSelector(state => state.apps.timerRecords);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadDailyDurations());
  }, []);

  return (
    <div>
      <div
        style={{
          padding: '4rem 1rem 1rem 5rem',
          border: '#fdfdfd solid 2px',
          marginTop: '2rem',
          overflow: 'auto',
          position: 'relative',
          borderRadius: '10px',
          boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.5)',
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
        }}
      >
        <div
          className='ps-1 pe-5 d-flex d-inline-flex justify-content-between'
          style={{
            width: '90%',
            position: 'absolute',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            top: 30,
          }}
        >
          <span>Jan</span>
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
          <span>May</span>
          <span>Jun</span>
          <span>Jul</span>
          <span>Aug</span>
          <span>Sep</span>
          <span>Oct</span>
          <span>Nov</span>
          <span>Dec</span>
        </div>
        <div
          className='ps-1 pe-5 d-flex flex-column justify-content-between'
          style={{
            height: '50%',
            position: 'absolute',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            top: 88,
            left: 20,
          }}
        >
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
        </div>
        <div
          className='d-flex flex-column flex-wrap'
          style={{ height: '12rem', position: 'relative' }}
        >
          {[...Array(daysPerYear)].map((e, i) => (
            <CalendarDay key={i} index={i} dailyDurations={dailyDurations} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
