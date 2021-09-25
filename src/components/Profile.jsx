import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BeatLoader } from 'react-spinners'
import SubjectsCardStandalone from '../subjects-app/components/SubjectsCardStandalone'
import {
  loadSubjects,
  loadUpvotedSubjects,
} from '../store/apps/subjectsActions'
import plansAndProgress from '../../src/static/images/plansAndProgress.png'
import dailyStatus from '../../src/static/images/dailyStatus.png'
import Calendar from '../calendar-app/components/Calendar'
import { loadVizData } from './../store/apps/timerRecordsActions'

const Profile = () => {
  const subjects = useSelector(state => state.apps.subjects.list)
  const upvotedSubjects = useSelector(state => state.apps.subjects.upvoted)
  const { loading } = useSelector(state => state.apps.subjects)
  const { user } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadSubjects())
    dispatch(loadUpvotedSubjects())
    dispatch(loadVizData())
  }, [])

  console.log(plansAndProgress)

  return (
    <div
      className='full-height'
      style={{ width: '80%', position: 'absolute', left: '10%' }}
    >
      <h2 className='mt-5 text-center'>
        Progress Tracker{' '}
        <span style={{ fontSize: '1.5rem' }}>(in progress)</span>
      </h2>
      <Calendar />
      {/* <img src={plansAndProgress} className='mt-4' style={{ width: '100%' }} /> */}
      <h2 className='mt-5 text-center'>
        Daily Status <span style={{ fontSize: '1.5rem' }}>(in progress)</span>
      </h2>
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
          {loading ? (
            <div className='center'>
              <BeatLoader size={50} color={'#6A7475'} loading={loading} />
            </div>
          ) : (
            <div className='pin-container' style={{ height: 1100 }}>
              {subjects.map(subject => (
                <SubjectsCardStandalone
                  key={subject._id}
                  user={user}
                  subject={subject}
                />
              ))}
            </div>
          )}
        </div>
        <div className='col-6'>
          <h2 className='mt-5 text-center'>Watchlist</h2>
          {loading ? (
            <div className='center'>
              <BeatLoader size={50} color={'#6A7475'} loading={loading} />
            </div>
          ) : (
            <div className='pin-container'>
              {upvotedSubjects.map(subject => (
                <SubjectsCardStandalone
                  key={subject._id}
                  user={user}
                  subject={subject}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
