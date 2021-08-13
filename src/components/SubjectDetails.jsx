import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import SubjectDetailsWrapper from './../subject-details-app/components/SubjectDetailsWrapper'

const SubjectDetails = () => {
  const subject = useSelector(state => state.apps.subjects.selectedSubject)
  const { id } = useParams()
  return (
    <div className='container'>
      <div className='mt-4'>
        <h2>Subject: {subject.name}</h2>
      </div>
      <SubjectDetailsWrapper subjectId={id} />
    </div>
  )
}

export default SubjectDetails
