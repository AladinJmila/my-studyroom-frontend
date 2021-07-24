import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SubjectsCardPublic from '../subjects-app/components/SubjectsCardPublic'
import { loadPublicSubjects } from '../store/apps/subjectsActions'

const Home = () => {
  const pulicSubjects = useSelector(state => state.apps.subjects.public)
  const { user } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadPublicSubjects())
  }, [])

  return (
    <div className='container full-height'>
      <h2 className='mt-5 text-center'>Presentation video</h2>
      <div
        className='mt-4 mb-4 center'
        style={{
          width: '60%',
          height: 400,
          borderRadius: '0.25rem',
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
        }}
      ></div>

      <h2 className='mt-5 text-center'>Popular Subjects</h2>
      <div className='d-flex flex-row bd-highlight justify-content-around flex-wrap p-4'>
        {pulicSubjects.map(subject => (
          <SubjectsCardPublic key={subject._id} user={user} subject={subject} />
        ))}
      </div>

      {/* <h2 className='mt-5 text-center'>Popular Courses</h2>
      <div className='d-flex flex-row bd-highlight justify-content-around flex-wrap p-4'>
        {subjects.map(subject => (
          <SubjectsCardPublic key={subject._id} user={user} subject={subject} />
        ))}
      </div> */}
    </div>
  )
}

export default Home
