import Star from '../../common/Star'
import CardEllipsisMenu from '../../common/CardEllipsisMenu'
import {
  computeIntervalDuration,
  formatDuration,
} from '../services/intervalsServices'

const IntervalsCard = ({ user, interval, onToggleProp, onDelete, onEdit }) => {
  const intervalDuration = computeIntervalDuration(interval)
  const formattedDuration = formatDuration(intervalDuration)

  const intervalsCardStyle = {
    backgroundColor: interval.color,
    borderRadius: '0.25rem',
    margin: 8,
  }

  return (
    <div style={intervalsCardStyle} className='card flex-fill mb-1'>
      <div className='p-3 text-center'>
        <h6 className='mb-1'>
          {interval.name}
          {interval.starred && <Star className='yellow' starred={true} />}
          <div className='card-link float-end ms-2'>
            {user && (
              <CardEllipsisMenu
                item={interval}
                onEdit={onEdit}
                onToggleProp={onToggleProp}
                onDelete={onDelete}
                vertical
              />
            )}
          </div>
        </h6>
        <h6 className='mb-0'>{formattedDuration}</h6>
      </div>
    </div>
  )
}

export default IntervalsCard
