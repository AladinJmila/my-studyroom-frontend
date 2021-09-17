import CalendarDay from './CalendarDay'
import { useEffect } from 'react'
import { loadDailyDurations } from '../../store/apps/timerRecordsActions'
import { useDispatch, useSelector } from 'react-redux'

const Calendar = () => {
  const daysPerYear = 364
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
          overflow: 'hidden',
        }}
      >
        <div
          class='d-inline-flex flex-column bd-highlight flex-wrap'
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
