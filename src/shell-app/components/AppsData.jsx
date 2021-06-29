import { useEffect, useState } from 'react'
import _ from 'lodash'
import Notes from '../../notes-app/components/Notes'
import Tasks from '../../tasks-app/components/Tasks'
import Resources from '../../resources-app/components/Resources'
import Practicals from '../../practicals-app/components/Practicals'
import DataColumn from './DataColumn'
import { useSelector } from 'react-redux'
import AudioNotes from './../../audio-notes-app/components/AudioNotes'
import VisualNotes from './../../visual-notes-app/components/VisualNotes'
import Schedules from './../../schedules-app/Schedules'

const AppsData = () => {
  const [showPracticals, setShowPracticals] = useState(true)
  const [showResources, setShowResources] = useState(true)
  const [showNotes, setShowNotes] = useState(true)
  const [showTasks, setShowTasks] = useState(true)
  const [showAudioNotes, setShowAudioNotes] = useState(true)
  const [showVisualNotes, setShowVisualNotes] = useState(true)
  const [showSchedules, setShowSchedules] = useState(true)

  const { selectedSubject } = useSelector(state => state.apps.subjects)

  useEffect(() => {}, [])
  const subjectName = selectedSubject ? selectedSubject.name : 'All Subjects'
  const tasksCount = useSelector(state => state.ui.tasksPerSubject[subjectName])
  const notesCount = useSelector(state => state.ui.notesPerSubject[subjectName])
  const resourcesCount = useSelector(
    state => state.ui.resourcesPerSubject[subjectName]
  )
  const practicalsCount = useSelector(
    state => state.ui.practicalsPerSubject[subjectName]
  )

  const appsDataArray = [
    {
      name: 'Tasks',
      icon: 'rebel',
      count: tasksCount,
      show: showTasks,
      setShow: setShowTasks,
      data: <Tasks />,
    },
    {
      name: 'Resources',
      icon: 'circle',
      count: resourcesCount,
      show: showResources,
      setShow: setShowResources,
      data: <Resources />,
    },
    {
      name: 'Notes',
      icon: 'certificate',
      count: notesCount,
      show: showNotes,
      setShow: setShowNotes,
      data: <Notes />,
    },
    {
      name: 'Practicals',
      icon: 'asterisk',
      count: practicalsCount,
      show: showPracticals,
      setShow: setShowPracticals,
      data: <Practicals />,
    },
    {
      name: 'Audio-Notes (planned)',
      icon: 'sun-o',
      count: 0,
      show: showAudioNotes,
      setShow: setShowAudioNotes,
      data: <AudioNotes />,
    },
    {
      name: 'Visual-Notes (planned)',
      icon: 'first-order',
      count: 0,
      show: showVisualNotes,
      setShow: setShowVisualNotes,
      data: <VisualNotes />,
    },
    {
      name: 'Schedules (planned)',
      icon: 'snowflake-o',
      count: 0,
      show: showSchedules,
      setShow: setShowSchedules,
      data: <Schedules />,
    },
  ]

  const SortedAppsData = _.orderBy(appsDataArray, ['count'], ['desc'])

  return (
    <div style={{ padding: '0 0 0 5px' }} className='col scrolling-wrapper'>
      {SortedAppsData.map(item => (
        <DataColumn
          key={item.name}
          data={item.data}
          name={item.name}
          icon={item.icon}
          show={item.show}
          count={item.count}
          setShow={item.setShow}
          // sortedCount={item.sortedCount}
          // setSortedCount={item.setSortedCount}
        />
      ))}
      <div
        style={{
          minWidth: 47,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          borderRadius: 10,
          margin: '0 5px',
        }}
      ></div>
    </div>
  )
}

export default AppsData
