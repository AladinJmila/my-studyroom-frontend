import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SubjectsCardPublic from '../subjects-app/components/SubjectsCardPublic'
import {
  loadSubjects,
  loadUpvotedSubjects,
} from '../store/apps/subjectsActions'
import plansAndProgress from '../../src/static/images/plansAndProgress.png'
import dailyStatus from '../../src/static/images/dailyStatus.png'

const Profile = () => {
  const subjects = useSelector(state => state.apps.subjects.list)
  const upvotedSubjects = useSelector(state => state.apps.subjects.upvoted)
  const { user } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadSubjects())
    dispatch(loadUpvotedSubjects())
  }, [])

  return (
    <div
      className='full-height'
      style={{ width: '80%', position: 'absolute', left: '10%' }}
    >
      <h2 className='mt-5 text-center'>Progress Tracker</h2>
      <img src={plansAndProgress} className='mt-4' style={{ width: '100%' }} />
      <h2 className='mt-5 text-center'>Daily Status</h2>
      <img src={dailyStatus} className='mt-4 mb-4' style={{ width: '100%' }} />
      {/* <div
        className='mt-4 mb-4'
        style={{
          width: '100%',
          height: 300,
          borderRadius: '0.25rem',
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
        }}
      ></div> */}
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
          <h2 className='mt-5 text-center'>Watchlist</h2>
          <div className='pin-container'>
            {upvotedSubjects.map(subject => (
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
