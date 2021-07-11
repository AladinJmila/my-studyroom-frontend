import Star from '../../common/Star'
import CardEllipsisMenu from '../../common/CardEllipsisMenu'
import IntervalsChip from './IntervalsChip'
import computeTotalDuration from '../servecies/computeTotalDuration'

const LoopsCard = ({
  user,
  loop,
  intervals,
  onToggleProp,
  onDelete,
  onEdit,
}) => {
  let loopIntervals = []

  loop.intervalsIds.forEach(item => {
    loopIntervals.push(
      ...intervals.filter(interval => interval._id === item['intervalId'])
    )
  })

  let intervalsDuration = []
  loopIntervals.forEach(interval =>
    intervalsDuration.push(computeTotalDuration(interval))
  )
  // console.log(intervalsDuration)

  const totalSeconds = intervalsDuration.reduce(
    (t, { seconds }) => t + seconds,
    0
  )
  let totalMinutes = intervalsDuration.reduce(
    (t, { minutes }) => t + minutes,
    0
  )

  let totalHours = intervalsDuration.reduce((t, { hours }) => t + hours, 0)

  if (totalMinutes > 60) {
    totalHours += Math.floor(totalMinutes / 60)
    totalMinutes = totalMinutes % 60
  }

  const formatDuration = () => {
    const formattedSeconds =
      totalSeconds < 10 ? `0${totalSeconds}` : `${totalSeconds}`
    const formattedMinutes =
      totalMinutes < 10 ? `0${totalMinutes}` : `${totalMinutes}`
    const formattedHours = totalHours < 10 ? `0${totalHours}` : `${totalHours}`

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
  }

  // console.log(totalHours)
  // console.log(totalMinutes)

  const loopsCardStyle = {
    // backgroundColor: '#e8e8e8',
    borderRadius: '0.25rem',
    margin: 10,
  }

  return (
    <div style={loopsCardStyle} className='card mb-1'>
      <div className='p-2'>
        <div className='d-flex flex-row justify-content-between'>
          <h6 className='mb-0'>
            {loop.name} ({formatDuration()}){' '}
            {loop.starred && <Star className='yellow' starred={true} />}
          </h6>
          <div className='card-link float-end'>
            {user && (
              <CardEllipsisMenu
                item={loop}
                onEdit={onEdit}
                onToggleProp={onToggleProp}
                onDelete={onDelete}
              />
            )}
          </div>
        </div>
        <div className='d-flex flex-row' style={{ overflow: 'auto' }}>
          {loopIntervals.map(interval => (
            <IntervalsChip interval={interval} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default LoopsCard
