import { useState } from 'react'
import Subjects from '../subjects-app/components/Subjects'
import AppsWrapper from '../shell-app/components/AppsWrapper'
import VerticalNavBar from '../shell-app/components/VerticalNavBar'

function Shell() {
  const [showSubjects, setShowSubjects] = useState(true)
  const [tasksRef, setTasksRef] = useState()
  const [resourcesRef, setResourcesRef] = useState()
  const [notesRef, setNotesRef] = useState()
  const [practicalsRef, setPracticalsRef] = useState()
  const [audioNotesRef, setAudioNotesRef] = useState()
  const [visualNotesRef, setVisualNotesRef] = useState()
  const [schedulesRef, setSchedulesRef] = useState()
  const [appsWrapperRef, setAppsWrapperRef] = useState()

  const subjectsStyle = {
    paddingRight: 0,
    minWidth: 330,
    display: 'block',
    height: '92vh',
  }

  subjectsStyle.display = showSubjects ? 'block' : 'none'

  return (
    <main
      className='row ps-2 pt-3 flex-nowrap'
      style={{ marginRight: 0, height: '94vh' }}
    >
      <div style={subjectsStyle} className='col-2 y-scroll subjects'>
        <h2>Subjects</h2>
        <div>
          <Subjects appsWrapperRef={appsWrapperRef} />
        </div>
      </div>
      <VerticalNavBar
        showSubjects={showSubjects}
        setShowSubjects={setShowSubjects}
        tasksRef={tasksRef}
        resourcesRef={resourcesRef}
        notesRef={notesRef}
        practicalsRef={practicalsRef}
        audioNotesRef={audioNotesRef}
        visualNotesRef={visualNotesRef}
        schedulesRef={schedulesRef}
      />
      <AppsWrapper
        className='position-static'
        setTasksRef={setTasksRef}
        setResourcesRef={setResourcesRef}
        setNotesRef={setNotesRef}
        setPracticalsRef={setPracticalsRef}
        setAudioNotesRef={setAudioNotesRef}
        setVisualNotesRef={setVisualNotesRef}
        setSchedulesRef={setSchedulesRef}
        setAppsWrapperRef={setAppsWrapperRef}
      />
    </main>
  )
}

export default Shell
