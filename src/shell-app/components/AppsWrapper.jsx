import _ from 'lodash'
import { useEffect, useState, useRef, createRef } from 'react'
import { useSelector } from 'react-redux'
import Notes from '../../notes-app/components/Notes'
import Tasks from '../../tasks-app/components/Tasks'
import Resources from '../../resources-app/components/Resources'
import Practicals from '../../practicals-app/components/Practicals'
import DataColumn from './DataColumn'
import AudioNotes from '../../audio-notes-app/components/AudioNotes'
import VisualNotes from '../../visual-notes-app/components/VisualNotes'
import SchedulesWrapper from '../../schedules-app/components/SchedulesWrapper'
import AnimateReorderX from '../../Effects/AnimateReorderX'

const AppsWrapper = ({
  selectedSubject,
  setTasksRef,
  setResourcesRef,
  setNotesRef,
  setPracticalsRef,
  setAudioNotesRef,
  setVisualNotesRef,
  setSchedulesRef,
  setAppsWrapperRef,
}) => {
  const [showPracticals, setShowPracticals] = useState(false)
  const [showResources, setShowResources] = useState(false)
  const [showNotes, setShowNotes] = useState(false)
  const [showTasks, setShowTasks] = useState(false)
  const [showAudioNotes, setShowAudioNotes] = useState(false)
  const [showVisualNotes, setShowVisualNotes] = useState(false)
  const [showSchedules, setShowSchedules] = useState(false)

  const subjectName = selectedSubject ? selectedSubject.name : 'All Subjects'
  const tasksCount = useSelector(state => state.ui.tasksPerSubject[subjectName])
  const notesCount = useSelector(state => state.ui.notesPerSubject[subjectName])
  const resourcesCount = useSelector(
    state => state.ui.resourcesPerSubject[subjectName]
  )
  const practicalsCount = useSelector(
    state => state.ui.practicalsPerSubject[subjectName]
  )
  // const schedulesCount = useSelector(state => state.ui.totalSessions)

  const appsWrapperRef = useRef()
  useEffect(() => {
    setAppsWrapperRef(appsWrapperRef)
  }, [])

  const appsWrapperArray = [
    {
      name: 'Tasks',
      count: tasksCount,
      show: showTasks,
      setShow: setShowTasks,
      setRef: setTasksRef,
      data: <Tasks />,
    },
    {
      name: 'Resources',
      count: resourcesCount,
      show: showResources,
      setShow: setShowResources,
      setRef: setResourcesRef,
      data: <Resources />,
    },
    {
      name: 'Notes',
      count: notesCount,
      show: showNotes,
      setShow: setShowNotes,
      setRef: setNotesRef,
      data: <Notes />,
    },
    {
      name: 'Practicals',
      count: practicalsCount,
      show: showPracticals,
      setShow: setShowPracticals,
      setRef: setPracticalsRef,
      data: <Practicals />,
    },
    {
      name: 'AudioNotes (planned)',
      count: 0,
      show: showAudioNotes,
      setShow: setShowAudioNotes,
      setRef: setAudioNotesRef,
      data: <AudioNotes />,
    },
    {
      name: 'VisualNotes (planned)',
      count: 0,
      show: showVisualNotes,
      setShow: setShowVisualNotes,
      setRef: setVisualNotesRef,
      data: <VisualNotes />,
    },
    {
      name: 'Schedules (inProgress)',
      count: 1,
      show: showSchedules,
      setShow: setShowSchedules,
      setRef: setSchedulesRef,
      data: <SchedulesWrapper />,
    },
  ]

  const sortedAppsWrapper = _.orderBy(appsWrapperArray, ['count'], ['desc'])

  return (
    <div
      style={{ padding: 0, height: '92vh' }}
      className='col scrolling-wrapper d-flex flex-row justify-content-between'
    >
      <div ref={appsWrapperRef}></div>
      <AnimateReorderX>
        {sortedAppsWrapper.map(item => (
          <DataColumn
            key={item.name}
            data={item.data}
            name={item.name}
            show={item.show}
            count={item.count}
            setShow={item.setShow}
            ref={createRef()}
            setRef={item.setRef}
          />
        ))}
      </AnimateReorderX>
      <div
        style={{
          minWidth: 45,
          backgroundColor: '#212529',
          borderRadius: '10px 0 0 10px',
          margin: 0,
        }}
      ></div>
    </div>
  )
}

export default AppsWrapper
