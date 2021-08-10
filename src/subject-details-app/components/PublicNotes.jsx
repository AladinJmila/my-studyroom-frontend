import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BeatLoader } from 'react-spinners'
import { loadNotes } from './../../store/apps/notesActions'
import { cardsBody, mainContentStyle } from './../../services/stylesService'

const PublicNotes = () => {
  // const publicNotes = useSelector(state => state.apps.notes.list)
  const publicNotes = null
  const { loading } = useSelector(state => state.apps.notes)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadNotes())
  }, [])

  return (
    <div>
      {loading ? (
        <div className='center-spinner'>
          <BeatLoader size={50} color={'#6A7475'} loading={loading} />
        </div>
      ) : (
        <>
          {publicNotes &&
            publicNotes.map(note => (
              <div style={cardsBody} className='card mb-1'>
                <div className='p-3'>
                  {note.resource && (
                    <p className='card-subtitle mb-2 text-muted'>
                      {note.resource.content}
                    </p>
                  )}
                  <p
                    className='mb-0'
                    style={{ ...mainContentStyle, whiteSpace: 'pre-wrap' }}
                  >
                    {note.content}
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
                        ></i>
                      </a>
                    )}
                  </p>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  )
}

export default PublicNotes
