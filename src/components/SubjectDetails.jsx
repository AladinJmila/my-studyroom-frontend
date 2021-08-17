import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import SubjectDetailsWrapper from './../subject-details-app/components/SubjectDetailsWrapper'
import {
  loadSubject,
  cloneSubject,
  clearClonedSubject,
  setSelectedSubject,
} from './../store/apps/subjectsActions'
import { cloneResources } from './../store/apps/resourcesActions'
import { cloneNotes } from '../store/apps/notesActions'
import { clonePracticals } from '../store/apps/practicalsActions'
import { cloneTasks } from '../store/apps/tasksActions'
import SubjectsCardFooter from '../subjects-app/components/SubjectsCardFooter'

const SubjectDetails = () => {
  const subject = useSelector(state => state.apps.subjects.selectedSubject)
  const clonedSubject = useSelector(state => state.apps.subjects.clonedSubject)
  const { loading } = useSelector(state => state.apps.subjects)
  const { user } = useSelector(state => state.auth)
  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadSubject(id))
  }, [])

  const handleSubjectClone = () => {
    dispatch(cloneSubject(subject._id))
  }

  if (clonedSubject) {
    if (clonedSubject.numberOfPublicResources !== 0)
      dispatch(cloneResources(subject._id, clonedSubject._id))

    if (clonedSubject.numberOfPublicNotes !== 0)
      dispatch(cloneNotes(subject._id, clonedSubject._id))

    if (clonedSubject.numberOfPublicPracticals !== 0)
      dispatch(clonePracticals(subject._id, clonedSubject._id))

    if (clonedSubject.numberOfPulbicTasks !== 0)
      dispatch(cloneTasks(subject._id, clonedSubject._id))

    dispatch(clearClonedSubject())
    dispatch(setSelectedSubject(clonedSubject))
  }

  const subjectDetails = {
    width: '40%',
    minHeight: '5rem',
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
              <div className='d-flex justify-content-center'>
                <div className='mt-4' style={subjectDetails}>
                  <div className='float-end pointer'>
                    <i
                      title='clone'
                      onClick={handleSubjectClone}
                      className='fa fa-lg fa-clone mt-2 float-end'
                      aria-hidden='true'
                    ></i>
                    <p
                      className='float-end me-2'
                      style={{ fontSize: '1.2rem' }}
                    >
                      Clone
                    </p>
                  </div>
                  <h2>{subject.name}</h2>
                  <div style={{ marginTop: '5rem' }}>
                    <SubjectsCardFooter subject={subject} user={user} details />
                  </div>
                </div>
              </div>
              <div className='d-flex justify-content-center'>
                <div style={{ width: '70%' }}>
                  <SubjectDetailsWrapper subject={subject} />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default SubjectDetails
