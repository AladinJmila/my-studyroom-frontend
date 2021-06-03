import { backgroundOpacity } from './../../services/stylesService'
import Toggle from './../../common/Toggle'

const PracticalsCard = ({
  user,
  practical,
  onToggleProp,
  onDelete,
  onEdit,
}) => {
  return (
    <div style={backgroundOpacity} className='card mb-1'>
      <div className='card-body'>
        <h6 className='card-title'>
          {user && (
            <i
              className='fa fa-pencil mr-3'
              style={{ cursor: 'pointer' }}
              aria-hidden='true'
              onClick={() => onEdit(practical)}
            ></i>
          )}
          {practical.subject.name}
          {user && (
            <i
              onClick={() => onDelete(practical)}
              style={{ cursor: 'pointer' }}
              className='fa fa-times float-right'
              aria-hidden='true'
            ></i>
          )}
        </h6>
        <div>
          {practical.about && (
            <>
              <h6>About:</h6> <p>{practical.about}</p>
            </>
          )}
          {practical.cause && (
            <>
              <h6>Cause:</h6> <p>{practical.cause}</p>
            </>
          )}
          {practical.solution && (
            <>
              <h6>Solution:</h6> <p>{practical.solution}</p>
            </>
          )}
          {practical.lesson && (
            <>
              <h6>Lesson:</h6> <p>{practical.lesson}</p>
            </>
          )}
        </div>
        <div>
          <Toggle
            toggled={practical.isPublic}
            onToggle={() => onToggleProp(practical, 'isPublic')}
          />
          {practical.url && (
            <a
              className='card-link float-right'
              href={practical.url}
              target='_blank'
              rel='noreferrer'
            >
              <i className='fa fa-external-link' aria-hidden='true'></i>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default PracticalsCard
