import { useEffect } from 'react'
import ToggleSideTab from './ToggleSideTab'
import iconTSI from '../../static/images/icons/T-S-I.png'
import iconRSI from '../../static/images/icons/R-S-I.png'
import iconNSI from '../../static/images/icons/N-S-I.png'
import iconPSI from '../../static/images/icons/P-S-I.png'
import iconASI from '../../static/images/icons/A-S-I.png'
import iconVSI from '../../static/images/icons/V-S-I.png'
import iconSSI from '../../static/images/icons/S-S-I.png'

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
    maxWidth: 55,
    backgroundColor: '#212529',
    borderRadius: '0 10px 10px 0',
    margin: 0,
    padding: 10,
  }

  const buttonStyle = {
    boxShadow: '0px 3px 8px #aaa, inset 0px 2px 3px #fff',
    borderRadius: '50%',
    width: 40,
    height: 40,
    padding: 4,
  }
  useEffect(() => {}, [])

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
      className='float-start position-sticky d-flex felx-column justify-content-around flex-wrap center pt-5 pb-5'
      style={styles}
    >
      <ToggleSideTab
        label='Subjects'
        show={showSubjects}
        setShow={setShowSubjects}
      />

      <img
        style={buttonStyle}
        className='v-bar-icon fa fa-rebel fa-2x mt-4'
        onClick={navigateToTasks}
        src={iconTSI}
      />

      <img
        style={buttonStyle}
        className='v-bar-icon fa fa-circle fa-2x mt-2'
        onClick={navigateToResources}
        src={iconRSI}
      />
      <img
        style={buttonStyle}
        className='v-bar-icon fa fa-certificate fa-2x mt-2'
        onClick={navigateToNotes}
        src={iconNSI}
      />
      <img
        style={buttonStyle}
        className='v-bar-icon fa fa-asterisk fa-2x mt-2'
        onClick={navigateToPracticals}
        src={iconPSI}
      />
      <img
        style={buttonStyle}
        className='v-bar-icon fa fa-sun-o fa-2x mt-2'
        onClick={navigateToAudioNotes}
        src={iconASI}
      />
      <img
        style={buttonStyle}
        className='v-bar-icon fa fa-first-order fa-2x mt-2'
        onClick={navigateToVisualNotes}
        src={iconVSI}
      />
      <img
        style={buttonStyle}
        className='v-bar-icon fa fa-snowflake-o fa-2x mt-2'
        onClick={navigateToSchedules}
        src={iconSSI}
      />
    </div>
  )
}

export default VerticalNavBar
