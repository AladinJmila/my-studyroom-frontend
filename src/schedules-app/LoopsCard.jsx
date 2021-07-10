import Star from '../common/Star'
import CardEllipsisMenu from '../common/CardEllipsisMenu'
import loops from '../store/apps/loops'

const LoopsCard = ({
  user,
  loop,
  intervals,
  onToggleProp,
  onDelete,
  onEdit,
}) => {
  const loopsCardStyle = {
    // backgroundColor: interval.color,
    borderRadius: '0.25rem',
    margin: 10,
  }
  const subStyle = {
    backgroundColor: '',
  }

  return (
    <div style={loopsCardStyle} className='card mb-1'>
      <div className='p-3'>
        <h6 className='mb-0'>{loop.name}</h6>
        {loop.intervalsIds.map(item =>
          intervals.map(
            interval =>
              interval._id === item &&
              subStyle.backgroundColor === interval.color
          )
        )}
        {loop.intervalsIds.map(item => (
          <div style={subStyle}>boo</div>
        ))}
      </div>
    </div>
  )
}

export default LoopsCard
