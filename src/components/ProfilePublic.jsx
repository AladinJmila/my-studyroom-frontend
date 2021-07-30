import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SubjectsCardPublic from '../subjects-app/components/SubjectsCardPublic'
import {
  loadOneUserPublicSubjects,
  loadOneUserUpvotedSubjects,
} from '../store/apps/subjectsActions'
import { useParams } from 'react-router-dom'

const ProfilePublic = () => {
  const { creatorName, creatorId } = useParams()
  const usersPublicsubjects = useSelector(
    state => state.apps.subjects.usersPublic[creatorId]
  )

  const usersUpvotedSubjects = useSelector(
    state => state.apps.subjects.usersUpvoted[creatorId]
  )
  const { user } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadOneUserPublicSubjects(creatorId))
    dispatch(loadOneUserUpvotedSubjects(creatorId))
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
      <h2 className='mt-5 text-center'>{creatorName}</h2>
      <div className='row'>
        <div className='col-6'>
          <h2 className='mt-5 text-center'>My Public Subjects</h2>
          <div className='pin-container' style={{ height: 1100 }}>
            {usersPublicsubjects?.map(subject => (
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
            {usersUpvotedSubjects?.map(subject => (
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

export default ProfilePublic
