import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SubjectsCardHome from '../subjects-app/components/SubjectsCardHome'
import { loadSubjects } from '../store/apps/subjectsActions'

const Profile = () => {
  const subjects = useSelector(state => state.apps.subjects.list)
  const { user } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadSubjects())
  }, [])

  return (
    <div className='container full-height'>
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
      <div className='d-flex flex-row bd-highlight justify-content-between'>
        <div>
          <h2 className='mt-5 text-center'>My Subjects</h2>
          <div className='d-flex flex-row bd-highlight justify-content-around flex-wrap me-3 mt-4 mb-4'>
            {subjects.map(subject => (
              <SubjectsCardHome
                key={subject._id}
                user={user}
                subject={subject}
              />
            ))}
          </div>
        </div>
        <div>
          <h2 className='mt-5 text-center'>Followed Subjects</h2>
          <div className='d-flex flex-row bd-highlight justify-content-around flex-wrap ms-3 mt-4 mb-4'>
            {subjects.map(subject => (
              <SubjectsCardHome
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
