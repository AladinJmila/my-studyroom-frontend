import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import 'react-circular-progressbar/dist/styles.css'
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
import SubjectsShareForm from './SubjectsSahreForm'
import { userIsEditor } from './../../services/permissionsService'
import ProgressStats from './ProgressStats'
import ItemsCount from './ItemsCount'
import SubjectsCardFooter from './SubjectsCardFooter'
import SubjectsCardHeader from './SubjectsCardHeader'

const SubjectsCard = ({
  user,
  subject,
  onSubjectSelect,
  onToggleProp,
  onToggleUpvote,
  onDelete,
}) => {
  const [showShareForm, setShowShareForm] = useState(false)
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

  const handleShowShareForm = () => {
    setShowShareForm(showShareForm ? false : true)
  }

  let checkEditor
  if (subject.name !== 'All Subjects') {
    checkEditor = userIsEditor(subject, user?._id)
  }
  const showPrivateInfo =
    user && (user._id === subject.creatorId || checkEditor)

  return (
    <div
      onClick={() => onSubjectSelect(subject)}
      style={{ ...backgroundOpacity }}
      className={
        (!selectedSubject && subject.name === 'All Subjects') ||
        selectedSubject?.name === subject.name
          ? 'card text-white bg-dark mb-1 opacity'
          : 'card mb-1 opacity'
      }
    >
      <div className='card-body'>
        <SubjectsCardHeader
          subject={subject}
          onDelete={onDelete}
          onToggleProp={onToggleProp}
          onShowShareForm={handleShowShareForm}
          showPrivateInfo={showPrivateInfo}
        />

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

        <SubjectsCardFooter
          user={user}
          subject={subject}
          onToggleUpvote={onToggleUpvote}
        />
      </div>
      {showShareForm && (
        <div className='center-screen'>
          <SubjectsShareForm
            subject={subject}
            toggleShowForm={handleShowShareForm}
          />
        </div>
      )}
    </div>
  )
}

export default SubjectsCard
