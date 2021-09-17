import CalendarDay from './CalendarDay'
import { useEffect } from 'react'
import { loadDailyDurations } from '../../store/apps/timerRecordsActions'
import { useDispatch, useSelector } from 'react-redux'

const Calendar = () => {
  const daysPerYear = 365
  const { dailyDurations } = useSelector(state => state.apps.timerRecords)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadDailyDurations())
  }, [])

  return (
    <div>
      <h1>Calendar</h1>
      <div
        style={{
          padding: '4rem 1rem 1rem 5rem',
          border: 'black solid 1px',
          backgroundColor: '#F2F2F2',
          overflow: 'auto',
          position: 'relative',
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
          class='d-flex flex-column flex-wrap'
          style={{ height: '12rem', position: 'relative' }}
        >
          {[...Array(daysPerYear)].map((e, i) => (
            <CalendarDay index={i} dailyDurations={dailyDurations} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Calendar
