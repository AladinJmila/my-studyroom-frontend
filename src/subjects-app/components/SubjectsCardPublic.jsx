import { useDispatch } from 'react-redux'
import 'react-circular-progressbar/dist/styles.css'
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
import {
  upvoteSubject,
  toggleSubjectUpvote,
} from '../../store/apps/subjectsActions'
import ItemsCount from './ItemsCount'
import ProgressStats from './ProgressStats'
import CardFooter from './CardFooter'

const SubjectsCardPublic = ({ user, subject }) => {
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

    dispatch(upvoteSubject(subject._id, update))
    dispatch(toggleSubjectUpvote(subject._id, user._id))
  }

  const itemsToDisplay = showPrivateInfo
    ? [
        subject.numberOfTasks,
        subject.numberOfResources,
        subject.numberOfNotes,
        subject.numberOfPracticals,
      ]
    : [
        subject.numberOfPublicTasks,
        subject.numberOfPublicResources,
        subject.numberOfPublicNotes,
        subject.numberOfPublicPracticals,
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
    <div style={cardStyle} className='card m-2'>
      <div className='card-body'>
        <div className='d-flex flex-row justify-content-between'>
          <h5 className='card-title text-truncate'>
            {subject.name}{' '}
            {subject.starred && <Star className='yellow' starred />}
          </h5>
        </div>

        <ProgressStats
          condition={showPrivateInfo}
          tasksPercentage={tasksPercentage}
          resourcesPercentage={resourcesPercentage}
        />

        <div className='font-weight-bold' style={mainContentStyle}>
          <ItemsCount
            name='Tasks'
            condition={showPrivateInfo}
            itemsCount={subject.numberOfTasks}
            checkedItemsCount={subject.numberOfCheckedTasks}
            publicItemsCount={subject.numberOfPublicTasks}
          />

          <ItemsCount
            name='Resources'
            condition={showPrivateInfo}
            itemsCount={subject.numberOfResources}
            checkedItemsCount={subject.numberOfCheckedResources}
            publicItemsCount={subject.numberOfPublicResources}
          />

          <ItemsCount
            name='Study Notes'
            condition={showPrivateInfo}
            itemsCount={subject.numberOfNotes}
            checkedItemsCount={subject.numberOfCheckedNotes}
            publicItemsCount={subject.numberOfPublicNotes}
          />

          <ItemsCount
            name='Practice Notes'
            condition={showPrivateInfo}
            itemsCount={subject.numberOfPracticals}
            checkedItemsCount={subject.numberOfCheckedPracticals}
            publicItemsCount={subject.numberOfPublicPracticals}
          />
        </div>

        <CardFooter
          user={user}
          subject={subject}
          onToggleUpvote={handleToggleUpvote}
        />
      </div>
    </div>
  )
}

export default SubjectsCardPublic
