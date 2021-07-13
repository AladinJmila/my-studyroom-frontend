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
    margin: 10,
  }

  return (
    <div style={intervalsCardStyle} className='card mb-1'>
      <div className='p-3'>
        <div className='d-flex flex-row justify-content-between'>
          <h6 className='mb-0'>
            {interval.name} ({formattedDuration}){' '}
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
