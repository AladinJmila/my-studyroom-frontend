import Check from '../../common/Check';
import Star from '../../common/Star';
import CardEllipsisMenu from './../../common/CardEllipsisMenu';
import { cardsBody, mainContentStyle } from './../../services/stylesService';
import { userIsEditor } from './../../services/permissionsService';

const TasksCard = ({ user, task, onToggleProp, onEdit, onDelete }) => {
  const showPrivateInfo = user && userIsEditor(task, user._id);

  return (
    <div style={cardsBody} className='card mb-1'>
      <div className='p-3'>
        <div className='d-flex flex-row justify-content-between '>
          <h6 className='card-subtitle mb-2'>
            {task.subject.name}{' '}
            {task.isPublic && <i style={{ color: '#3E98C7' }}>P</i>}{' '}
            {task.starred && <Star className='yellow' starred />}
          </h6>
          <div className='card-link float-end'>
            {showPrivateInfo && (
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
          <div className='float-start me-2'>
            {showPrivateInfo && (
              <Check
                onCheck={() => onToggleProp(task, 'isChecked')}
                isChecked={task.isChecked}
              />
            )}
          </div>{' '}
          {task.isChecked && showPrivateInfo ? (
            <div className='mb-2' style={mainContentStyle}>
              <s>
                <div dangerouslySetInnerHTML={{ __html: task.content }}></div>
                {task.url && (
                  <a
                    href={task.url}
                    rel='noreferrer'
                    target='_blank'
                    className='float-end'
                  >
                    <i className='fa fa-external-link' aria-hidden='true'></i>
                  </a>
                )}
              </s>
            </div>
          ) : (
            <div className='mb-2' style={mainContentStyle}>
              <div dangerouslySetInnerHTML={{ __html: task.content }}></div>
              {task.url && (
                <a
                  href={task.url}
                  rel='noreferrer'
                  target='_blank'
                  className='float-end'
                >
                  <i className='fa fa-external-link' aria-hidden='true'></i>
                </a>
              )}
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default TasksCard;
