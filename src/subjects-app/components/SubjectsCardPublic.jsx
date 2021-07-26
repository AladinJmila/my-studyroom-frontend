import { useDispatch, useSelector } from 'react-redux'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import CardEllipsisMenu from '../../common/CardEllipsisMenu'
import Star from '../../common/Star'
import {
  backgroundOpacity,
  mainContentStyle,
} from '../../services/stylesService'
import {
  setTasksPerSubject,
  setNotesPerSubject,
  setResourcesPerSubject,
  setPracticalsPerSubject,
} from '../../store/ui/uiParams'
import Upvote from '../../common/Upvote'
import {
  patchSubject,
  toggleSubjectUpvote,
} from '../../store/apps/subjectsActions'

const SubjectsCardPublic = ({ user, subject, onToggleUpvote }) => {
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

  const showPrivateInfo = user && user._id === subject.creatorId

  const handleToggleUpvote = (subject, status) => {
    const update = { upvote: status }

    dispatch(patchSubject(subject._id, update))
    dispatch(toggleSubjectUpvote(subject._id, user._id))
  }

  const itemsToDisplay = [
    subject.numberOfTasks,
    subject.numberOfResources,
    subject.numberOfNotes,
    subject.numberOfPracticals,
  ]

  let countOfZeros = 0
  let gridRowEnd
  itemsToDisplay.forEach(item => {
    if (item === 0) countOfZeros++
  })

  switch (countOfZeros) {
    case 0:
      gridRowEnd = 'span 38'
      break
    case 1:
      gridRowEnd = 'span 35'
      break
    case 2:
      gridRowEnd = 'span 33'
      break
    case 3:
      gridRowEnd = 'span 30'
      break
    case 4:
      gridRowEnd = 'span 28'
      break

    default:
      gridRowEnd = 'span 39'
      break
  }

  const cardStyle = {
    ...backgroundOpacity,
    gridRowEnd,
    margin: '15px 10px',
  }

  return (
    <div
      // onClick={() => onSubjectSelect(subject)}
      style={cardStyle}
      className='card m-2'
    >
      <div className='card-body'>
        <div className='d-flex flex-row justify-content-between'>
          <h5 className='card-title'>
            {subject.name}{' '}
            {subject.starred && <Star className='yellow' starred />}
          </h5>
          {/* <div className='card-link float-end'>
            {user && subject.name !== 'All Subjects' && (
              <CardEllipsisMenu
                item={subject}
                // onEdit={onEdit}
                onToggleProp={onToggleProp}
                onDelete={onDelete}
              />
            )}
          </div> */}
        </div>

        <div className='d-flex flex-row justify-content-between mt-3'>
          <div className='text-center me-1'>
            <CircularProgressbar
              value={showPrivateInfo ? tasksPercentage : 0}
              text={`${showPrivateInfo ? tasksPercentage : 0}%`}
            />
            <h5 className='mt-2'>Tasks</h5>
          </div>
          <div className='text-center ms-1'>
            <CircularProgressbar
              value={showPrivateInfo ? resourcesPercentage : 0}
              text={`${showPrivateInfo ? resourcesPercentage : 0}%`}
            />
            <h5 className='mt-2'>Resources</h5>
          </div>
        </div>

        <div className='font-weight-bold' style={mainContentStyle}>
          {Boolean(subject.numberOfTasks) && (
            <p style={{ margin: 2 }}>
              Tasks:
              <span className='float-end'>
                {showPrivateInfo &&
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
                {showPrivateInfo &&
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
                {showPrivateInfo &&
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
                {showPrivateInfo &&
                  Boolean(subject.numberOfCheckedResources) &&
                  subject.numberOfCheckedResources + '/'}
                {subject.numberOfResources}
              </span>
            </p>
          )}
        </div>
        <div className='mt-3 d-flex flex-row justify-content-between'>
          <div>
            {showPrivateInfo && (
              <a href='#' className='card-link'>
                {subject.creatorName}
              </a>
            )}
          </div>
          <div className='pb-0 mb-0'>
            <h6 className='me-2 mb-0 ' style={{ display: 'inline-block' }}>
              {subject.upvotes.length || 0}
            </h6>
            <Upvote
              user={user}
              item={subject}
              onToggleUpvote={handleToggleUpvote}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubjectsCardPublic
