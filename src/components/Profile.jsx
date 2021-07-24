import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SubjectsCardPublic from '../subjects-app/components/SubjectsCardPublic'
import { loadSubjects, loadPublicSubjects } from '../store/apps/subjectsActions'

const Profile = () => {
  const subjects = useSelector(state => state.apps.subjects.list)
  const publicSubjects = useSelector(state => state.apps.subjects.public)
  const { user } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadSubjects())
    dispatch(loadPublicSubjects())
  }, [])

  return (
    <div
      className='full-height'
      style={{ width: '80%', position: 'absolute', left: '10%' }}
    >
      <h2 className='mt-5 text-center'>Timeline</h2>
      <div
        className='mt-4 mb-4'
        style={{
          width: '100%',
          height: 300,
          borderRadius: '0.25rem',
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
        }}
      ></div>
      {/* <div className='d-flex flex-row bd-highlight justify-content-between'> */}
      <div className='row'>
        <div className='col-6'>
          <h2 className='mt-5 text-center'>My Subjects</h2>
          <div className='pin-container' style={{ height: 1100 }}>
            {subjects.map(subject => (
              <SubjectsCardPublic
                key={subject._id}
                user={user}
                subject={subject}
              />
            ))}
          </div>
        </div>
        <div className='col-6'>
          <h2 className='mt-5 text-center'>Watched Subjects</h2>
          <div className='pin-container'>
            {publicSubjects.map(subject => (
              <SubjectsCardPublic
                key={subject._id}
                user={user}
                subject={subject}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
