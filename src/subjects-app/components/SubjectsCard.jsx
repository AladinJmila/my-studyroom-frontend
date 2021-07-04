import { useDispatch, useSelector } from 'react-redux'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import CardEllipsisMenu from './../../common/CardEllipsisMenu'
import Star from '../../common/Star'
import {
  backgroundOpacity,
  mainContentStyle,
} from './../../services/stylesService'
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
  const { selectedSubject } = useSelector(state => state.apps.subjects)

  const dispatch = useDispatch()

  const tasksPercentage =
    Math.round((subject.numberOfCheckedTasks / subject.numberOfTasks) * 100) ||
    0

  const resourcesPercentage =
    Math.round(
      (subject.numberOfCheckedResources / subject.numberOfResources) * 100
    ) || 0

  dispatch(setTasksPerSubject(subject.name, subject.numberOfTasks))
  dispatch(setNotesPerSubject(subject.name, subject.numberOfNotes))
  dispatch(setResourcesPerSubject(subject.name, subject.numberOfResources))
  dispatch(setPracticalsPerSubject(subject.name, subject.numberOfPracticals))

  return (
    <div
      onClick={() => onSubjectSelect(subject)}
      style={backgroundOpacity}
      className={
        (!selectedSubject && subject.name === 'All Subjects') ||
        selectedSubject?.name === subject.name
          ? 'card text-white bg-dark mb-1 opacity'
          : 'card mb-1 opacity'
      }
    >
      <div className='card-body'>
        <div className='d-flex flex-row justify-content-between '>
          <h5 className='card-title'>
            {subject.name}{' '}
            {subject.starred && <Star className='yellow' starred={true} />}
          </h5>
          <div className='card-link float-right'>
            {user && subject.name !== 'All Subjects' && (
              <CardEllipsisMenu
                item={subject}
                // onEdit={onEdit}
                onToggleProp={onToggleProp}
                onDelete={onDelete}
              />
            )}
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col text-center'>
            <CircularProgressbar
              value={tasksPercentage}
              text={`${tasksPercentage}%`}
            />
            <h5 className='mt-2'>Tasks</h5>
          </div>
          <div className='col text-center'>
            <CircularProgressbar
              value={resourcesPercentage}
              text={`${resourcesPercentage}%`}
            />
            <h5 className='mt-2'>Resources</h5>
          </div>
        </div>

        <div className='font-weight-bold' style={mainContentStyle}>
          {Boolean(subject.numberOfTasks) && (
            <p style={{ margin: 2 }}>
              Tasks:
              <span className='float-right'>
                {Boolean(subject.numberOfCheckedTasks) &&
                  subject.numberOfCheckedTasks + '/'}
                {subject.numberOfTasks}
              </span>
            </p>
          )}
          {Boolean(subject.numberOfNotes) && (
            <p style={{ margin: 2 }}>
              Notes:{' '}
              <span className='float-right'>
                {' '}
                {Boolean(subject.numberOfCheckedNotes) &&
                  subject.numberOfCheckedNotes + '/'}
                {subject.numberOfNotes}
              </span>
            </p>
          )}

          {Boolean(subject.numberOfPracticals) && (
            <p style={{ margin: 2 }}>
              Practicals:{' '}
              <span className='float-right'>
                {' '}
                {Boolean(subject.numberOfCheckedPracticals) &&
                  subject.numberOfCheckedPracticals + '/'}
                {subject.numberOfPracticals}
              </span>
            </p>
          )}
          {Boolean(subject.numberOfResources) && (
            <p style={{ margin: 2 }}>
              Resources:
              <span className='float-right'>
                {Boolean(subject.numberOfCheckedResources) &&
                  subject.numberOfCheckedResources + '/'}
                {subject.numberOfResources}
              </span>
            </p>
          )}
        </div>
        <div className='mt-2'>
          {!user && (
            <a href='#' className='card-link'>
              {subject.userName}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default SubjectsCard
