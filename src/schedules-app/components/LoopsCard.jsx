import Star from '../../common/Star'
import CardEllipsisMenu from '../../common/CardEllipsisMenu'
import IntervalsChip from './IntervalsChip'
import { formatDuration } from '../services/loopsServices'

const LoopsCard = ({ user, loop, onToggleProp, onDelete, onEdit }) => {
  const formattedDuration = formatDuration(loop.totalDuration)

  const loopsCardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '0.25rem',
    margin: 10,
  }

  return (
    <div style={loopsCardStyle} className='card mb-1'>
      <div className='p-2'>
        <div className='d-flex flex-row justify-content-between'>
          <h6 className='mb-0'>
            {loop.name} ({formattedDuration}){' '}
            {loop.starred && <Star className='yellow' starred />}
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
          {loop.intervals.map(interval => (
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
