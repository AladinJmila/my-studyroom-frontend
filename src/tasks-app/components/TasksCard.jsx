import { cardsBody, mainContentStyle } from './../../services/stylesService'
import Check from '../../common/Check'
import Star from '../../common/Star'
import CardEllipsisMenu from './../../common/CardEllipsisMenu'
import ExternalLink from './../../common/ExternalLink'

const TasksCard = ({ user, task, onToggleProp, onEdit, onDelete }) => {
  return (
    <div style={cardsBody} className='card mb-1'>
      <div className='p-3'>
        <div className='d-flex flex-row justify-content-between '>
          <h6 className='card-subtitle mb-2'>
            {task.subject.name}{' '}
            {task.starred && <Star className='yellow' starred={true} />}
          </h6>
          <div className='card-link float-right'>
            {user && (
              <CardEllipsisMenu
                item={task}
                onEdit={onEdit}
                onToggleProp={onToggleProp}
                onDelete={onDelete}
              />
            )}
          </div>
        </div>
        {task.resource && (
          <p className='card-subtitle mb-2 text-muted'>
            {task.resource.content}
          </p>
        )}
        <>
          <div className='card-title float-left mr-2'>
            {user && (
              <Check
                onCheck={() => onToggleProp(task, 'isChecked')}
                isChecked={task.isChecked}
              />
            )}
          </div>{' '}
          {task.isChecked ? (
            <p className='mb-2' style={mainContentStyle}>
              <s>
                {task.content}{' '}
                {task.url && (
                  <a
                    href={task.url}
                    rel='noreferrer'
                    target='_blank'
                    className='float-right'
                  >
                    <i className='fa fa-external-link' aria-hidden='true'></i>
                  </a>
                )}
              </s>
            </p>
          ) : (
            <p className='mb-2' style={mainContentStyle}>
              {task.content}
              {task.url && (
                <a
                  href={task.url}
                  rel='noreferrer'
                  target='_blank'
                  className='float-right'
                >
                  <i className='fa fa-external-link' aria-hidden='true'></i>
                </a>
              )}
            </p>
          )}
        </>
      </div>
    </div>
  )
}

export default TasksCard
