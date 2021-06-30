import Star from '../../common/Star'
import { cardsBody, mainContentStyle } from './../../services/stylesService'
import Toggle from './../../common/Toggle'

const NotesCard = ({ user, note, onDelete, onToggleProp, onEdit }) => {
  return (
    <div style={cardsBody} className='card mb-1'>
      <div className='p-3'>
        <h6 className='card-title'>
          {user && (
            <i
              className='fa fa-pencil mr-3'
              style={{ cursor: 'pointer' }}
              aria-hidden='true'
              onClick={() => onEdit(note)}
            ></i>
          )}
          {note.title}
          {user && (
            <i
              onClick={() => onDelete(note)}
              style={{ cursor: 'pointer' }}
              className='fa fa-times float-right'
              aria-hidden='true'
            ></i>
          )}
        </h6>
        <h6 className='card-subtitle mb-2 text-muted'>{note.subject.name}</h6>
        {note.resource && (
          <p className='card-subtitle mb-2 text-muted'>
            {note.resource.content}
          </p>
        )}
        <p
          className='card-text'
          style={{ ...mainContentStyle, whiteSpace: 'pre-wrap' }}
        >
          {note.content}
        </p>
        <div className='row'>
          {user && (
            <div className='col'>
              <Toggle
                toggled={note.isPublic}
                onToggle={() => onToggleProp(note, 'isPublic')}
              />
            </div>
          )}
          <div className='col text-center'>
            <Star
              className='yellow'
              onStar={() => onToggleProp(note, 'starred')}
              starred={note.starred}
            />
          </div>
          <div className='col'>
            {note.url && (
              <a
                href={note.url}
                rel='noreferrer'
                target='_blank'
                className='card-link float-right'
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

export default NotesCard
