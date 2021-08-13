import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import SubjectDetailsWrapper from './../subject-details-app/components/SubjectDetailsWrapper'
import { loadSubject } from './../store/apps/subjectsActions'

const SubjectDetails = () => {
  const subject = useSelector(state => state.apps.subjects.selectedSubject)
  const { loading } = useSelector(state => state.apps.subjects)
  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadSubject(id))
  }, [])

  const subjectDetails = {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    margin: '16px 0',
    padding: 20,
  }

  return (
    <div className='container'>
      {loading ? (
        <div className='center-spinner'>
          <BeatLoader size={50} color={'#6A7475'} loading={loading} />
        </div>
      ) : (
        <>
          {subject && (
            <>
              <div className='mt-4' style={subjectDetails}>
                <h2 className='text-center'>{subject.name}</h2>
                <h3>Creator: {subject.creatorName}</h3>
                <h3>Upvotes: {subject.upvotes.length}</h3>
              </div>
              <SubjectDetailsWrapper subject={subject} />
            </>
          )}
        </>
      )}
    </div>
  )
}

export default SubjectDetails
