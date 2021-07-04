import {
  cardsBody,
  mainContentStyle,
  checkedStyle,
} from './../../services/stylesService'
import Check from './../../common/Check'
import Star from '../../common/Star'
import CardEllipsisMenu from './../../common/CardEllipsisMenu'

const ResourcesCard = ({ user, resource, onToggleProp, onEdit, onDelete }) => {
  return (
    <div style={cardsBody} className='card mb-1'>
      <div className='p-3'>
        <div className='d-flex flex-row justify-content-between '>
          {resource.url ? (
            <h6 className='card-subtitle mb-2 link'>
              {resource.subject.name}{' '}
              {resource.starred && <Star className='yellow' starred={true} />}
            </h6>
          ) : (
            <h6 className='card-subtitle mb-2'>
              {resource.subject.name}{' '}
              {resource.starred && <Star className='yellow' starred={true} />}
            </h6>
          )}
          <div className='card-link float-right'>
            {user && (
              <CardEllipsisMenu
                item={resource}
                onEdit={onEdit}
                onToggleProp={onToggleProp}
                onDelete={onDelete}
              />
            )}
          </div>
        </div>
        <div className='card-title float-left mr-2'>
          {user && (
            <Check
              onCheck={() => onToggleProp(resource, 'isChecked')}
              isChecked={resource.isChecked}
            />
          )}
        </div>{' '}
        {resource.isChecked ? (
          <p className='mb-2' style={checkedStyle}>
            {resource.content}
          </p>
        ) : (
          <p className='mb-2' style={mainContentStyle}>
            {resource.content}
          </p>
        )}
      </div>
    </div>
  )
}

export default ResourcesCard
