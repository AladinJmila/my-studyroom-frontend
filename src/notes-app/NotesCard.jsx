import {
  cardsBody,
  checkedStyle,
  mainContentStyle,
} from './../services/stylesService';
import Check from './../common/Check';
import Star from '../common/Star';
import CardEllipsisMenu from './../common/CardEllipsisMenu';
import { userIsEditor } from './../services/permissionsService';

const NotesCard = ({ user, note, onDelete, onToggleProp, onEdit }) => {
  const showPrivateInfo = user && userIsEditor(note, user._id);

  // function htmlDecode(content) {
  //   let e = document.createElement('div');
  //   e.innerHTML = content;
  //   return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
  // }

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
        <h6 className='card-subtitle mb-2 text-muted'>{note.subject.name}</h6>
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
              // dangerouslySetInnerHTML={{ __html: htmlDecode(note.content) }}
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
