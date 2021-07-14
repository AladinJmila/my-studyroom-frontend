import Star from '../../common/Star'
import CardEllipsisMenu from '../../common/CardEllipsisMenu'
import {
  formatDetailedDuration,
  formatDuration,
} from '../services/intervalsServices'
import { mainContentStyle } from '../../services/stylesService'

const IntervalsCard = ({ user, interval, onToggleProp, onDelete, onEdit }) => {
  const formattedDuration = formatDuration(interval.totalDuration)
  const formattedDetailedDuration = formatDetailedDuration(interval)

  const intervalsCardStyle = {
    backgroundColor: interval.color,
    borderRadius: '0.25rem',
    margin: 4,
  }

  return (
    <div style={mainContentStyle} className='card flex-fill m-1'>
      <div style={intervalsCardStyle} className='card flex-fill mb-1'>
        <div className='p-3 text-center'>
          <h6 className='mb-1'>
            {interval.name}
            {interval.starred && <Star className='yellow' starred />}
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
          <h6 className='mb-0'>
            {formattedDuration}{' '}
            {interval.numOfReps > 1 &&
              `(${interval.numOfReps} x ${formattedDetailedDuration})`}
          </h6>
        </div>
      </div>
    </div>
  )
}

export default IntervalsCard
