const CalendarDay = ({ index, dailyDurations }) => {
  let color
  let hours = dailyDurations.filter(
    item => Object.keys(item)[0] === String(index)
  )
  if (hours[0]) hours = hours[0][String(index)]

  switch (true) {
    case hours > 9:
      color = '#CC7400'
      break

    case hours > 7:
      color = '#FF9C1A'
      break

    case hours > 3:
      color = '#FFB452'
      break

    case hours > 0:
      color = '#FFCE8F'
      break

    default:
      color = '#D9D9D9'
      break
  }

  const dayStyle = {
    height: '1.3rem',
    width: '1.3rem',
    backgroundColor: color,
    borderRadius: '0.65rem',
    margin: '0.208rem',
  }

  return (
    <div>
      <div style={dayStyle}></div>
    </div>
  )
}

export default CalendarDay
