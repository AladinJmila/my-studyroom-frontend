import Star from '../../common/Star'
import PlayStop from './../../common/PlayStop'
import CardEllipsisMenu from '../../common/CardEllipsisMenu'
import { formatDuration } from '../services/schedulesServices'
import {
  getLoopIntervals,
  computeLoopDuration,
} from '../services/loopsServices'

const SchedulesCard = ({
  user,
  schedule,
  intervals,
  loops,
  onToggleProp,
  onDelete,
  onEdit,
}) => {
  const loop = loops.filter(l => l._id === schedule.loopId)[0]
  const loopIntervals = getLoopIntervals(loop.intervalsIds, intervals)
  const loopDuration = computeLoopDuration(loopIntervals)
  const formattedDuration = formatDuration(loopDuration, schedule.numOfReps)

  const schedulesCardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: '0.25rem',
    margin: 10,
  }

  return (
    <div style={schedulesCardStyle} className='card mb-1'>
      <div className='p-2 align-items-center row'>
        {/* {user && ( */}
        <div
          className='col-1'
          style={user ? { color: '#3E98C7' } : { color: 'grey' }}
        >
          <PlayStop
            onToggle={() => user && onToggleProp(schedule, 'play')}
            play={schedule.play}
            user={user}
          />
        </div>
        {/* )} */}
        <div className='col ms-2' style={{ borderLeft: '1px solid black' }}>
          <div className='d-flex flex-row justify-content-between'>
            <h5 className='mb-2'>
              {schedule.subject.name}{' '}
              {schedule.starred && <Star className='yellow' starred />}
            </h5>
            <div className='card-link float-end'>
              {user && (
                <CardEllipsisMenu
                  item={schedule}
                  onEdit={onEdit}
                  onToggleProp={onToggleProp}
                  onDelete={onDelete}
                />
              )}
            </div>
          </div>
          <div className='d-flex flex-row justify-content-between'>
            <h6 className='mb-2'>
              {schedule.name} ({formattedDuration})
            </h6>
            <h6 className='mb-2'>
              {schedule.numOfReps && `${schedule.numOfReps} x `}
              {loop.name}
            </h6>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SchedulesCard
