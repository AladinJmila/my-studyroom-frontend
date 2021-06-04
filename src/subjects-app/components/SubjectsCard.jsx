import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import {
  calculatePercentage,
  totalTasksPerSubject,
  totalResourcesPerSubject,
  totalNotesPerSubject,
  totalPracticalsPerSubject,
} from '../services/generateStatsData'
import { backgroundOpacity } from './../../services/stylesService'
import Toggle from './../../common/Toggle'

const SubjectsCard = ({
  user,
  subject,
  onSubjectSelect,
  onToggleProp,
  onDelete,
  selectedSubject,
  allTasks,
  allResources,
  allNotes,
  allPracticals,
}) => {
  const percentage = 0
  const tasksPrecentage = calculatePercentage(subject, allTasks)
  const totalTasks = totalTasksPerSubject(subject, allTasks)
  const totalResources = totalResourcesPerSubject(subject, allResources)
  const totalNotes = totalNotesPerSubject(subject, allNotes)
  const totalPracticals = totalPracticalsPerSubject(subject, allPracticals)

  return (
    <div
      onClick={() => onSubjectSelect(subject)}
      style={backgroundOpacity}
      className={
        (!selectedSubject && subject.name === 'All Subjects') ||
        selectedSubject === subject
          ? 'card text-white bg-dark mb-1 opacity'
          : 'card mb-1 opacity'
      }
    >
      <div className='card-body'>
        <h5 className='card-title'>
          {/* {subject.name !== 'All Subjects' && user && (
            <i
              className='fa fa-pencil mr-3'
              style={{ cursor: 'pointer' }}
              aria-hidden='true'
              onClick={() => onEdit(subject)}
            ></i>
          )} */}
          {subject.name}{' '}
          {subject.name !== 'All Subjects' && user && (
            <i
              style={{ zIndex: 5, cursor: 'pointer' }}
              onClick={() => onToggleProp(subject, 'isPinned')}
              className={
                subject.isPinned
                  ? 'fa fa-bullseye float-right'
                  : 'fa fa-circle-thin float-right'
              }
              aria-hidden='true'
            ></i>
          )}
        </h5>

        {/* <h6 className='card-subtitle mb-2 text-muted'>PlaceHolder</h6> */}
        <div className='row mt-3'>
          <div className='col'>
            <CircularProgressbar
              value={tasksPrecentage}
              text={`${tasksPrecentage}%`}
            />
            <h5 className='ml-4 mt-2'>Tasks</h5>
          </div>
          <div className='col'>
            <CircularProgressbar value={percentage} text={`${percentage}%`} />
            <h5 className='mt-2'>Resources</h5>
          </div>
        </div>

        <p className='card-text mt-2'>Tasks: {totalTasks}</p>
        <p className='card-text mt-2'>Resources: {totalResources}</p>
        <p className='card-text mt-2'>Notes: {totalNotes}</p>
        <p className='card-text mt-2'>Practicals : {totalPracticals}</p>
        {user && (
          <a href='#' className='card-link' onClick={() => onDelete(subject)}>
            delete
          </a>
        )}
        {subject.name !== 'All Subjects' && user && (
          <h6 className='float-right'>
            Public
            <Toggle
              onToggle={() => onToggleProp(subject, 'isPublic')}
              toggled={subject.isPublic}
            />
          </h6>
        )}
        {/* <a href='#' className='card-link float-right'>
          share
        </a> */}
      </div>
    </div>
  )
}

export default SubjectsCard
