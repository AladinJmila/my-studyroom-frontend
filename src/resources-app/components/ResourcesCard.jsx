import {
  backgroundOpacity,
  mainContentStyle,
  resourceStatusStudy,
  resourceStatusRevise,
  cardBackgroundStudy,
  cardBackgroundRevise,
  resourceStatusReset,
} from './../../services/stylesService'
import Toggle from './../../common/Toggle'

const ResourcesCard = ({
  user,
  resource,
  onToggleProp,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  let backgroundColor
  switch (resource.status) {
    case 'Study':
      backgroundColor = cardBackgroundStudy
      break
    case 'Revise':
      backgroundColor = cardBackgroundRevise
      break
    default:
      backgroundColor = backgroundOpacity
  }

  return (
    <div style={backgroundColor} className='card mb-1'>
      <div className='card-body'>
        <h6 className='card-subtitle mb-2'>
          {user && (
            <i
              className='fa fa-pencil mr-3'
              style={{ cursor: 'pointer' }}
              aria-hidden='true'
              onClick={() => onEdit(resource)}
            ></i>
          )}
          {resource.subject.name}
          <div className='card-link float-right'>
            {user && (
              <i
                onClick={() => onDelete(resource)}
                style={{ cursor: 'pointer' }}
                className='fa fa-lg fa-times'
                aria-hidden='true'
              ></i>
            )}
          </div>
        </h6>
        <p className='card-text' style={mainContentStyle}>
          {resource.content}
        </p>
        <div className='row'>
          {user && (
            <div className='col'>
              <Toggle
                toggled={resource.isPublic}
                onToggle={() => onToggleProp(resource, 'isPublic')}
              />
            </div>
          )}
          {user && (
            <>
              <div className='col'>
                <div
                  className='center'
                  style={resourceStatusStudy}
                  title='Study'
                  onClick={() => onToggleStatus(resource, 'Study')}
                ></div>
              </div>
              <div className='col'>
                <div
                  className='center'
                  style={resourceStatusRevise}
                  title='Revise'
                  onClick={() => onToggleStatus(resource, 'Revise')}
                ></div>
              </div>
              <div className='col'>
                <div
                  className='center'
                  style={resourceStatusReset}
                  title='Reset'
                  onClick={() => onToggleStatus(resource, 'Reset')}
                ></div>
              </div>
            </>
          )}
          <div className='col'>
            <a
              className='card-link float-right'
              href={resource.url}
              target='_blank'
              rel='noreferrer'
            >
              <i className='fa fa-external-link' aria-hidden='true'></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResourcesCard
