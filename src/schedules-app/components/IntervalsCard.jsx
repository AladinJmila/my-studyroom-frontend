import Star from '../../common/Star'
import CardEllipsisMenu from '../../common/CardEllipsisMenu'
import computeTotalDuration from '../servecies/computeTotalDuration'

const IntervalsCard = ({ user, interval, onToggleProp, onDelete, onEdit }) => {
  const result = computeTotalDuration(interval)

  const formatDuration = () => {
    const { minutes, seconds } = result
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`

    return `${formattedMinutes}:${formattedSeconds}`
  }

  const intervalsCardStyle = {
    backgroundColor: interval.color,
    borderRadius: '0.25rem',
    margin: 10,
  }

  return (
    <div style={intervalsCardStyle} className='card mb-1'>
      <div className='p-3'>
        <div className='d-flex flex-row justify-content-between'>
          <h6 className='mb-0'>
            {interval.name} ({formatDuration()}){' '}
            {interval.starred && <Star className='yellow' starred={true} />}
          </h6>
          <div className='card-link float-end'>
            {user && (
              <CardEllipsisMenu
                item={interval}
                onEdit={onEdit}
                onToggleProp={onToggleProp}
                onDelete={onDelete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default IntervalsCard
