import { useDispatch } from 'react-redux';
import { useState, useCallback, useEffect } from 'react';
import {
  cardsBody,
  checkedStyle,
  mainContentStyle,
} from './../services/stylesService';
import Check from './../common/Check';
import Star from '../common/Star';
import CardEllipsisMenu from './../common/CardEllipsisMenu';
import { userIsEditor } from './../services/permissionsService';
import { createTask } from '../store/apps/tasksActions';
import { updateSubjectItemsCount } from '../store/apps/subjectsActions';

const NotesCard = ({ user, note, onDelete, onToggleProp, onEdit }) => {
  const showPrivateInfo = user && userIsEditor(note, user._id);
  const [btnColor, setBtnColor] = useState('neutral');
  const dispatch = useDispatch();

  useEffect(() => {}, [btnColor]);

  const generateTasks = useCallback(note => {
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = note.content;
    const listTitles = tempContainer.getElementsByTagName('strong');
    let reps = 0;
    let tasks = [];

    [...listTitles].forEach(title => {
      const nextElement = title.parentNode.nextElementSibling;
      if (nextElement && nextElement.matches('ul')) {
        [...nextElement.children].forEach(el => {
          const task = {
            content: `${title.parentNode.innerHTML} ${el.innerHTML}`,
            creatorId: note.creatorId,
            resourceId: '',
            subjectId: note.subject._id,
            url: '',
          };

          tasks.push(task);
        });
      } else {
        setBtnColor('fail');
        setTimeout(() => setBtnColor('neutral'), 3000);
      }
    });

    if (tasks.length) {
      const createTaskInterval = setInterval(() => {
        dispatch(createTask(tasks[reps]));
        dispatch(updateSubjectItemsCount(tasks[reps], 'Tasks', 'create'));

        if (reps === tasks.length - 1) {
          clearInterval(createTaskInterval);
        }

        reps++;
      }, 500);

      setBtnColor('success');
      setTimeout(() => setBtnColor('neutral'), 3000);
    }

    if (!listTitles.length) {
      setBtnColor('fail');
      setTimeout(() => setBtnColor('neutral'), 3000);
    }
  }, []);

  return (
    <div style={cardsBody} className='card mb-1'>
      <div className='p-3'>
        <div className='d-flex flex-row justify-content-between '>
          <h6 className='card-subtitle mb-2'>
            {note.title}{' '}
            {note.isPublic && <i style={{ color: '#3E98C7' }}>P</i>}{' '}
            {note.starred && <Star className='yellow' starred />}
          </h6>
          <div className='card-link float-end'>
            {showPrivateInfo && (
              <CardEllipsisMenu
                item={note}
                onEdit={onEdit}
                onToggleProp={onToggleProp}
                onDelete={onDelete}
              />
            )}
          </div>
        </div>
        <div className='subject-name'>
          <h6 className='card-subtitle mb-2 text-muted'>{note.subject.name}</h6>{' '}
          <button
            className={`extract-tasks-btn ${btnColor}`}
            onClick={() => generateTasks(note)}
          >
            Extract tasks
          </button>
        </div>
        <>
          <div className='float-start me-2'>
            {showPrivateInfo && (
              <Check
                onCheck={() => onToggleProp(note, 'isChecked')}
                isChecked={note.isChecked}
              />
            )}
          </div>{' '}
          {note.isChecked && showPrivateInfo ? (
            <div
              className='mb-2'
              style={{ ...checkedStyle, whiteSpace: 'pre-wrap' }}
            >
              <div dangerouslySetInnerHTML={{ __html: note.content }}></div>
              {note.url && (
                <a
                  href={note.url}
                  rel='noreferrer'
                  target='_blank'
                  className='float-end'
                >
                  <i
                    className='fa fa-external-link'
                    aria-hidden='true'
                    style={{ color: '#d4e9ff' }}
                  ></i>
                </a>
              )}
            </div>
          ) : (
            <div
              className='mb-2'
              style={{ ...mainContentStyle, whiteSpace: 'pre-wrap' }}
            >
              <div dangerouslySetInnerHTML={{ __html: note.content }}></div>

              {note.url && (
                <a
                  href={note.url}
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

export default NotesCard;
