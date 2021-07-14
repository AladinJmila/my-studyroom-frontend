import { formatDuration } from '../services/intervalsServices'

const IntervalsCard = ({ interval }) => {
  const formattedDuration = formatDuration(interval.totalDuration)

  const intervalsChipStyle = {
    backgroundColor: interval.color,
    borderRadius: '0.25rem',
    margin: 4,
    whiteSpace: 'nowrap',
  }

  return (
    <div style={intervalsChipStyle} className='mb-1 p-2 flex-fill'>
      <div className='p-2 text-center'>
        <h6 className='mb-1'>{interval.name}</h6>
        <h6 className='mb-0'>{formattedDuration}</h6>
      </div>
    </div>
  )
}

export default IntervalsCard
