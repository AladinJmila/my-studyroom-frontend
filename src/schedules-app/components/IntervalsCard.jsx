import Star from '../../common/Star'
import CardEllipsisMenu from '../../common/CardEllipsisMenu'

const IntervalsCard = ({ user, interval, onToggleProp, onDelete, onEdit }) => {
  const totalDuration = () => {
    let minutes
    interval.minutes > 0
      ? (minutes =
          interval.minutes * interval.numOfReps +
          Math.floor((interval.seconds * interval.numOfReps) / 60))
      : (minutes = Math.floor((interval.seconds * interval.numOfReps) / 60))
    let seconds = (interval.seconds * interval.numOfReps) % 60
    minutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    seconds = seconds < 10 ? `0${seconds}` : `${seconds}`

    return `(${minutes}:${seconds})`
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
            {interval.name} {totalDuration()}{' '}
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
