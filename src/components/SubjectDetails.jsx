import { useParams } from 'react-router-dom'
import SubjectDetailsWrapper from './../subject-details-app/components/SubjectDetailsWrapper'

const SubjectDetails = () => {
  const { id } = useParams()
  return (
    <div className='container'>
      <h2>Subject Details</h2>
      <SubjectDetailsWrapper subjectId={id} />
    </div>
  )
}

export default SubjectDetails
