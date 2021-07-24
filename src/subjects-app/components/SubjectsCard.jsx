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
import Upvote from '../../common/Upvote'

const SubjectsCard = ({
  user,
  subject,
  onSubjectSelect,
  onToggleProp,
  onToggleUpvote,
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
        <div className='d-flex flex-row justify-content-between'>
          <h5 className='card-title'>
            {subject.name}{' '}
            {subject.starred && <Star className='yellow' starred />}
          </h5>
          <div className='card-link float-end'>
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

        <div className='d-flex flex-row justify-content-between mt-3'>
          <div className='me-2 text-center'>
            <CircularProgressbar
              value={user && user._id === subject.userId ? tasksPercentage : 0}
              text={`${
                user && user._id === subject.userId ? tasksPercentage : 0
              }%`}
            />
            <h5 className='mt-2'>Tasks</h5>
          </div>
          <div className='ms-2 text-center'>
            <CircularProgressbar
              value={
                user && user._id === subject.userId ? resourcesPercentage : 0
              }
              text={`${
                user && user._id === subject.userId ? resourcesPercentage : 0
              }%`}
            />
            <h5 className='mt-2'>Resources</h5>
          </div>
        </div>

        <div className='font-weight-bold' style={mainContentStyle}>
          {Boolean(subject.numberOfTasks) && (
            <p style={{ margin: 2 }}>
              Tasks:
              <span className='float-end'>
                {user &&
                  user._id === subject.userId &&
                  Boolean(subject.numberOfCheckedTasks) &&
                  subject.numberOfCheckedTasks + '/'}
                {subject.numberOfTasks}
              </span>
            </p>
          )}
          {Boolean(subject.numberOfNotes) && (
            <p style={{ margin: 2 }}>
              Notes:{' '}
              <span className='float-end'>
                {' '}
                {user &&
                  user._id === subject.userId &&
                  Boolean(subject.numberOfCheckedNotes) &&
                  subject.numberOfCheckedNotes + '/'}
                {subject.numberOfNotes}
              </span>
            </p>
          )}

          {Boolean(subject.numberOfPracticals) && (
            <p style={{ margin: 2 }}>
              Practicals:{' '}
              <span className='float-end'>
                {' '}
                {user &&
                  user._id === subject.userId &&
                  Boolean(subject.numberOfCheckedPracticals) &&
                  subject.numberOfCheckedPracticals + '/'}
                {subject.numberOfPracticals}
              </span>
            </p>
          )}
          {Boolean(subject.numberOfResources) && (
            <p style={{ margin: 2 }}>
              Resources:
              <span className='float-end'>
                {user &&
                  user._id === subject.userId &&
                  Boolean(subject.numberOfCheckedResources) &&
                  subject.numberOfCheckedResources + '/'}
                {subject.numberOfResources}
              </span>
            </p>
          )}
        </div>
        <div className='mt-3 d-flex flex-row justify-content-between'>
          <div>
            {!user && (
              <a href='#' className='card-link'>
                {subject.userName}
              </a>
            )}
          </div>
          <div>
            {subject.name !== 'All Subjects' && (
              <>
                <h6 className='me-2 mb-0' style={{ display: 'inline-block' }}>
                  {subject.upvotes.length || 0}
                </h6>
                <Upvote
                  user={user}
                  item={subject}
                  onToggleUpvote={onToggleUpvote}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubjectsCard
