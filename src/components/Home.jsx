import _ from 'lodash'
import { produce } from 'immer'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BeatLoader } from 'react-spinners'
import SubjectsCardStandalone from '../subjects-app/components/SubjectsCardStandalone'
import { loadPublicSubjects } from '../store/apps/subjectsActions'
import videoPlaceholder from '../static/images/Video placeholder.png'

const Home = () => {
  const publicSubjects = useSelector(state => state.apps.subjects.public)
  const { loading } = useSelector(state => state.apps.subjects)
  const { user } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadPublicSubjects())
  }, [])

  const tempPublicSubjects = produce(publicSubjects, list => {
    list.forEach(s => (s.numOfUpvotes = s.upvotes.length))
  })
  const sortedPublicSubjects = _.orderBy(
    tempPublicSubjects,
    ['numOfUpvotes'],
    ['desc']
  )

  return (
    <div className='container full-height'>
      <h2 className='mt-5 text-center'>Presentation video</h2>
      <div className='mt-4 mb-4 p-0 center' style={{ width: '60%' }}>
        <img src={videoPlaceholder} width='100%' />
      </div>

      <h2 className='mt-5 text-center'>Popular Subjects</h2>
      {loading ? (
        <div className='center'>
          <BeatLoader size={50} color={'#6A7475'} loading={loading} />
        </div>
      ) : (
        <div className='pin-container'>
          {sortedPublicSubjects.map(subject => (
            <SubjectsCardStandalone
              key={subject._id}
              user={user}
              subject={subject}
            />
          ))}
        </div>
      )}

      {/* <h2 className='mt-5 text-center'>Popular Courses</h2>
      <div className='d-flex flex-row bd-highlight justify-content-around flex-wrap p-4'>
        {subjects.map(subject => (
          <SubjectsCardStandalone key={subject._id} user={user} subject={subject} />
        ))}
      </div> */}
    </div>
  )
}

export default Home
