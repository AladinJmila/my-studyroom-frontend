import {
  mainContentStyle,
  checkedResourceStyle,
  cardsBody,
} from './../../services/stylesService'
import Toggle from './../../common/Toggle'
import Check from './../../common/Check'

const ResourcesCard = ({ user, resource, onToggleProp, onEdit, onDelete }) => {
  return (
    <div style={cardsBody} className='card mb-1'>
      <div className='p-3'>
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
        <div className='card-title float-left mr-2'>
          {user && (
            <>
              <Check
                onCheck={() => onToggleProp(resource, 'isChecked')}
                isChecked={resource.isChecked}
              />
            </>
          )}
        </div>{' '}
        {resource.isChecked ? (
          <p className='mb-2' style={checkedResourceStyle}>
            {resource.content}
          </p>
        ) : (
          <p className='mb-2' style={mainContentStyle}>
            {resource.content}
          </p>
        )}
        <div className='row'>
          {user && (
            <div className='col'>
              <div className='float-left ml-0 pl-0'>
                <Toggle
                  toggled={resource.isPublic}
                  onToggle={() => onToggleProp(resource, 'isPublic')}
                />
              </div>
            </div>
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
