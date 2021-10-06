import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppsWrapper from '../workspace-app/components/AppsWrapper'
import VerticalNavBar from '../workspace-app/components/VerticalNavBar'
import SubjectsWrapper from '../subjects-app/components/SubjectsWrapper'
import { loadNewestTimerRecord } from './../store/apps/timerRecordsActions'

function Workspace() {
  const [showSubjects, setShowSubjects] = useState(true)
  const [tasksRef, setTasksRef] = useState()
  const [resourcesRef, setResourcesRef] = useState()
  const [notesRef, setNotesRef] = useState()
  const [practicalsRef, setPracticalsRef] = useState()
  const [audioNotesRef, setAudioNotesRef] = useState()
  const [visualNotesRef, setVisualNotesRef] = useState()
  const [schedulesRef, setSchedulesRef] = useState()

  const { selectedSubject } = useSelector(state => state.apps.subjects)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadNewestTimerRecord())
  }, [])

  return (
    <main
      className='row ps-2 pt-3 flex-nowrap'
      style={{ marginRight: 0, height: '94vh' }}
    >
      <SubjectsWrapper showSubjects={showSubjects} />

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
        selectedSubject={selectedSubject}
        setTasksRef={setTasksRef}
        setResourcesRef={setResourcesRef}
        setNotesRef={setNotesRef}
        setPracticalsRef={setPracticalsRef}
        setAudioNotesRef={setAudioNotesRef}
        setVisualNotesRef={setVisualNotesRef}
        setSchedulesRef={setSchedulesRef}
      />
    </main>
  )
}

export default Workspace
