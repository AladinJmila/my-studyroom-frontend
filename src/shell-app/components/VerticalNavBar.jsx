import { useEffect, useRef } from 'react'
import ToggleSideTab from './ToggleSideTab'

const VerticalNavBar = ({
  showSubjects,
  setShowSubjects,
  tasksRef,
  resourcesRef,
  notesRef,
  practicalsRef,
  audioNotesRef,
  visualNotesRef,
  schedulesRef,
}) => {
  const styles = {
    maxWidth: 50,
    backgroundColor: 'rgba(52, 58, 64, 0.9)',
    borderRadius: '0 10px 10px 0',
    margin: 0,
    padding: 10,
  }

  useEffect(() => {}, [])

  // const { tasksRef } = useSelector(state => state.ui.navigationRefs)

  const navigateToTasks = () => {
    tasksRef.current.scrollIntoView({ behavior: 'smooth', inline: 'center' })
  }

  const navigateToResources = () => {
    resourcesRef.current.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
    })
  }

  const navigateToNotes = () => {
    notesRef.current.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
    })
  }

  const navigateToPracticals = () => {
    practicalsRef.current.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
    })
  }

  const navigateToAudioNotes = () => {
    audioNotesRef.current.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
    })
  }

  const navigateToVisualNotes = () => {
    visualNotesRef.current.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
    })
  }

  const navigateToSchedules = () => {
    schedulesRef.current.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
    })
  }

  return (
    <div
      className='float-left position-sticky d-flex felx-column justify-content-around flex-wrap center pt-5 pb-5'
      style={styles}
    >
      <ToggleSideTab
        label='Subjects'
        show={showSubjects}
        setShow={setShowSubjects}
      />
      <i
        className='v-bar-icon fa fa-rebel fa-2x mt-4'
        onClick={navigateToTasks}
        aria-hidden='true'
      ></i>
      <i
        className='v-bar-icon fa fa-circle fa-2x mt-2'
        onClick={navigateToResources}
        aria-hidden='true'
      ></i>
      <i
        className='v-bar-icon fa fa-certificate fa-2x mt-2'
        onClick={navigateToNotes}
        aria-hidden='true'
      ></i>
      <i
        className='v-bar-icon fa fa-asterisk fa-2x mt-2'
        onClick={navigateToPracticals}
        aria-hidden='true'
      ></i>
      <i
        className='v-bar-icon fa fa-sun-o fa-2x mt-2'
        onClick={navigateToAudioNotes}
        aria-hidden='true'
      ></i>
      <i
        className='v-bar-icon fa fa-first-order fa-2x mt-2'
        onClick={navigateToVisualNotes}
        aria-hidden='true'
      ></i>
      <i
        className='v-bar-icon fa fa-snowflake-o fa-2x mt-2 mb-5'
        onClick={navigateToSchedules}
        aria-hidden='true'
      ></i>
    </div>
  )
}

export default VerticalNavBar
