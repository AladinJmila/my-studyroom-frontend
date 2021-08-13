import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadOneSubjectPublicPracticals } from './../../store/apps/practicalsActions'
import { BeatLoader } from 'react-spinners'
import { cardsBody, mainContentStyle } from './../../services/stylesService'

const PublicPracticals = () => {
  const subject = useSelector(state => state.apps.subjects.selectedSubject)
  const publicPracticals = useSelector(
    state => state.apps.practicals.subjectsPublic[subject._id]
  )
  const { loading } = useSelector(state => state.apps.practicals)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadOneSubjectPublicPracticals(subject._id))
  }, [])
  return (
    <div>
      {loading ? (
        <div className='center-spinner'>
          <BeatLoader size={50} color={'#6A7475'} loading={loading} />
        </div>
      ) : (
        <>
          {publicPracticals &&
            publicPracticals.map(practical => (
              <div style={cardsBody} className='card mb-1'>
                <div className='p-3'>
                  <div>
                    {practical.url && (
                      <a
                        href={practical.url}
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
                    {practical.about && (
                      <>
                        <h6 className='pt-1'>About:</h6>{' '}
                        <p
                          className='mb-2'
                          style={{
                            ...mainContentStyle,
                            whiteSpace: 'pre-wrap',
                          }}
                        >
                          {practical.about}
                        </p>
                      </>
                    )}

                    {practical.cause && (
                      <>
                        <h6 className='pt-1'>Cause:</h6>{' '}
                        <p
                          className='mb-2'
                          style={{
                            ...mainContentStyle,
                            whiteSpace: 'pre-wrap',
                          }}
                        >
                          {practical.cause}
                        </p>
                      </>
                    )}
                    {practical.solution && (
                      <>
                        <h6 className='pt-1'>Solution:</h6>{' '}
                        <p
                          className='mb-2'
                          style={{
                            ...mainContentStyle,
                            whiteSpace: 'pre-wrap',
                          }}
                        >
                          {practical.solution}
                        </p>
                      </>
                    )}
                    {practical.lesson && (
                      <>
                        <h6 className='pt-1'>Lesson:</h6>{' '}
                        <p
                          className='mb-2'
                          style={{
                            ...mainContentStyle,
                            whiteSpace: 'pre-wrap',
                          }}
                        >
                          {practical.lesson}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  )
}

export default PublicPracticals
