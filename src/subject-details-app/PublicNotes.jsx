import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { loadOneSubjectPublicNotes } from './../store/apps/notesActions';
import { cardsBody, mainContentStyle } from './../services/stylesService';

const PublicNotes = () => {
  const subject = useSelector(state => state.apps.subjects.selectedSubject);
  const publicNotes = useSelector(
    state => state.apps.notes.subjectsPublic[subject._id]
  );
  const { loading } = useSelector(state => state.apps.notes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadOneSubjectPublicNotes(subject._id));
  }, []);

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
              <div key={note._id} style={cardsBody} className='card mb-1'>
                <div className='p-3'>
                  <h6 className='card-subtitle mb-2'>{note.title}</h6>
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
  );
};

export default PublicNotes;
