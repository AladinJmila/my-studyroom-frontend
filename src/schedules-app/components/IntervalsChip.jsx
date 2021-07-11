import computeTotalDuration from '../servecies/computeTotalDuration'

const IntervalsCard = ({ interval }) => {
  const result = computeTotalDuration(interval)

  const formatDuration = () => {
    const { minutes, seconds } = result
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`

    return `${formattedMinutes}:${formattedSeconds}`
  }

  const intervalsChipStyle = {
    backgroundColor: interval.color,
    // borderRadius: '0.25rem',
    margin: 2,
    whiteSpace: 'nowrap',
  }

  return (
    <div style={intervalsChipStyle} className='mb-1'>
      <div className='p-2 text-center'>
        {/* <div className='d-flex flex-row justify-content-between'> */}
        <h6 className='mb-0'>{interval.name}</h6>
        <h6 className='mb-0'>{formatDuration()}</h6>
        {/* </div> */}
      </div>
    </div>
  )
}

export default IntervalsCard
