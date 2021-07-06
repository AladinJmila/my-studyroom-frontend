import {
  cardsBody,
  checkedStyle,
  mainContentStyle,
} from './../../services/stylesService'
import Check from './../../common/Check'
import Star from '../../common/Star'
import CardEllipsisMenu from './../../common/CardEllipsisMenu'

const NotesCard = ({ user, note, onDelete, onToggleProp, onEdit }) => {
  return (
    <div style={cardsBody} className='card mb-1'>
      <div className='p-3'>
        <div className='d-flex flex-row justify-content-between '>
          <h6 className='card-subtitle mb-2'>
            {note.title}{' '}
            {note.starred && <Star className='yellow' starred={true} />}
          </h6>
          <div className='card-link float-right'>
            {user && (
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
        {note.resource && (
          <p className='card-subtitle mb-2 text-muted'>
            {note.resource.content}
          </p>
        )}
        <>
          <div className='card-title float-left mr-2'>
            {user && (
              <Check
                onCheck={() => onToggleProp(note, 'isChecked')}
                isChecked={note.isChecked}
              />
            )}
          </div>{' '}
          {note.isChecked ? (
            <p
              className='mb-2'
              style={{ ...checkedStyle, whiteSpace: 'pre-wrap' }}
            >
              {note.content}
              {note.url && (
                <a
                  href={note.url}
                  rel='noreferrer'
                  target='_blank'
                  className='float-right'
                >
                  <i
                    className='fa fa-external-link'
                    aria-hidden='true'
                    style={{ color: '#d4e9ff' }}
                  ></i>
                </a>
              )}
            </p>
          ) : (
            <p
              className='mb-2'
              style={{ ...mainContentStyle, whiteSpace: 'pre-wrap' }}
            >
              {note.content}
              {note.url && (
                <a
                  href={note.url}
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

export default NotesCard
