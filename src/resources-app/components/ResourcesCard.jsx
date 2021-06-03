import { backgroundOpacity } from './../../services/stylesService'
import Toggle from './../../common/Toggle'

const ResourcesCard = ({
  user,
  resource,
  onToggleProp,
  onEdit,
  onDelete,
  onSetStatus,
}) => {
  return (
    <div style={backgroundOpacity} className='card mb-1'>
      <div
        className={resource.status ? resource.status.bodyClass : 'card-body'}
      >
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
        <p className='card-text'>{resource.content}</p>
        <div className='row'>
          {user && (
            <div className='col'>
              <Toggle
                toggled={resource.isPublic}
                onToggle={() => onToggleProp(resource, 'isPublic')}
              />
            </div>
          )}
          <div className='col'>
            <i
              onClick={() => onSetStatus(resource, 'initialize')}
              className='fa fa-circle'
              style={{ cursor: 'pointer', color: '#000' }}
              aria-hidden='true'
            ></i>
          </div>
          <div className='col'>
            <i
              onClick={() => onSetStatus(resource, 'inProgress')}
              className='fa fa-circle'
              style={{ cursor: 'pointer', color: '#007BFF' }}
              aria-hidden='true'
            ></i>
          </div>
          <div className='col'>
            <i
              onClick={() => onSetStatus(resource, 'completed')}
              className='fa fa-circle'
              style={{ cursor: 'pointer', color: '#28A745' }}
              aria-hidden='true'
            ></i>
          </div>
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
