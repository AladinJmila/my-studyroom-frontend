import Star from '../../common/Star'
import CardEllipsisMenu from '../../common/CardEllipsisMenu'
import IntervalsChip from './IntervalsChip'
import { computeLoopDuration, formatDuration } from '../services/loopsServices'

const LoopsCard = ({
  user,
  loop,
  intervals,
  onToggleProp,
  onDelete,
  onEdit,
}) => {
  const loopIntervals = []
  loop.intervalsIds.forEach(item => {
    loopIntervals.push(
      ...intervals.filter(interval => interval._id === item.intervalId)
    )
  })

  const loopDuration = computeLoopDuration(loopIntervals)
  const formattedDuration = formatDuration(loopDuration)

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
            {loop.name} ({formattedDuration}){' '}
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
            <>
              <IntervalsChip key={interval._id} interval={interval} />
            </>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LoopsCard
