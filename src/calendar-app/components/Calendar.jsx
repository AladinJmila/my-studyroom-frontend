import CalendarDay from './CalendarDay'

const Calendar = () => {
  const daysPerYear = 364

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
          class='d-inline-flex bd-highlight flex-wrap'
          style={{ height: '12rem' }}
        >
          {[...Array(daysPerYear)].map((e, i) => (
            <CalendarDay />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Calendar
