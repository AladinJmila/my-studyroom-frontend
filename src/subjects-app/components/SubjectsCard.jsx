import { useDispatch, useSelector } from 'react-redux'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import {
  calculatePercentage,
  totalTasksPerSubject,
  totalResourcesPerSubject,
  totalNotesPerSubject,
  totalPracticalsPerSubject,
} from '../services/generateStatsData'
import {
  backgroundOpacity,
  mainContentStyle,
} from './../../services/stylesService'
import Toggle from './../../common/Toggle'
import {
  setTasksPerSubject,
  setNotesPerSubject,
  setResourcesPerSubject,
  setPracticalsPerSubject,
} from './../../store/ui/uiParams'

const SubjectsCard = ({
  user,
  subject,
  onSubjectSelect,
  onToggleProp,
  onDelete,
}) => {
  const allTasks = useSelector(state => state.apps.tasks.list)
  const allResources = useSelector(state => state.apps.resources.list)
  const allNotes = useSelector(state => state.apps.notes.list)
  const allPracticals = useSelector(state => state.apps.practicals.list)
  const dispatch = useDispatch()

  const percentage = 0
  const tasksPrecentage = calculatePercentage(subject, allTasks)

  const totalTasks = totalTasksPerSubject(subject, allTasks)
  dispatch(setTasksPerSubject(subject.name, totalTasks))

  const totalNotes = totalNotesPerSubject(subject, allNotes)
  dispatch(setNotesPerSubject(subject.name, totalNotes))

  const totalResources = totalResourcesPerSubject(subject, allResources)
  dispatch(setResourcesPerSubject(subject.name, totalResources))

  const totalPracticals = totalPracticalsPerSubject(subject, allPracticals)
  dispatch(setPracticalsPerSubject(subject.name, totalPracticals))

  const selectedSubject = useSelector(
    state => state.apps.subjects.selectedSubject
  )

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

        <div className='font-weight-bold' style={mainContentStyle}>
          {Boolean(totalTasks) && (
            <p style={{ margin: 2 }}>
              Tasks: <span className='float-right'>{totalTasks}</span>
            </p>
          )}
          {Boolean(totalNotes) && (
            <p style={{ margin: 2 }}>
              Notes: <span className='float-right'>{totalNotes}</span>
            </p>
          )}
          {Boolean(totalResources) && (
            <p style={{ margin: 2 }}>
              Resources: <span className='float-right'>{totalResources}</span>
            </p>
          )}
          {Boolean(totalPracticals) && (
            <p style={{ margin: 2 }}>
              Practicals :{' '}
              <span className='float-right'>{totalPracticals}</span>
            </p>
          )}
        </div>
        <div className='mt-2'>
          {user && (
            <a href='#' className='card-link' onClick={() => onDelete(subject)}>
              delete
            </a>
          )}
          {!user && (
            <a href='#' className='card-link'>
              {subject.userName}
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
        </div>
        {/* <a href='#' className='card-link float-right'>
          share
        </a> */}
      </div>
    </div>
  )
}

export default SubjectsCard
