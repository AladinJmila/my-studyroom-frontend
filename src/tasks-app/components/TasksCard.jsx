import Check from '../../common/Check'
import {
  backgrounOpacity,
  cardsBody,
  mainContentStyle,
} from './../../services/stylesService'
import Toggle from './../../common/Toggle'

const TasksCard = ({ user, task, onToggleProp, onEdit, onDelete }) => {
  return (
    <div style={cardsBody} className='card mb-1'>
      <div className='p-3'>
        <h6 className='card-subtitle mb-2'>
          {user && (
            <i
              className='fa fa-pencil mr-3'
              style={{ cursor: 'pointer' }}
              aria-hidden='true'
              onClick={() => onEdit(task)}
            ></i>
          )}
          {task.subject.name}
          <div className='card-link float-right'>
            {user && (
              <i
                onClick={() => onDelete(task)}
                style={{ cursor: 'pointer' }}
                className='fa fa-lg fa-times'
                aria-hidden='true'
              ></i>
            )}
          </div>
        </h6>
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
              <s>{task.content}</s>
            </p>
          ) : (
            <p className='mb-2' style={mainContentStyle}>
              {task.content}
            </p>
          )}
        </>
        <div className='row'>
          <div className='col'>
            {user && (
              <Toggle
                toggled={task.isPublic}
                onToggle={() => onToggleProp(task, 'isPublic')}
              />
            )}
          </div>
          <div className='col'>
            {task.url && (
              <a
                className='card-link float-right'
                href={task.url}
                target='_blank'
                rel='noreferrer'
              >
                <i className='fa fa-external-link' aria-hidden='true'></i>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TasksCard
