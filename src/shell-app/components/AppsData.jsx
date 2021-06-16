import { useState } from 'react'
import _ from 'lodash'
import Notes from '../../notes-app/components/Notes'
import Tasks from '../../tasks-app/components/Tasks'
import Resources from '../../resources-app/components/Resources'
import Practicals from '../../practicals-app/components/Practicals'
import DataColumn from './DataColumn'
import { useSelector } from 'react-redux'

const AppsData = () => {
  const [showPracticals, setShowPracticals] = useState(true)
  const [showResources, setShowResources] = useState(true)
  const [showNotes, setShowNotes] = useState(true)
  const [showTasks, setShowTasks] = useState(true)
  const [sortedTasks, setSortedTasks] = useState(1)

  const allTasks = useSelector(state => state.apps.tasks.list)
  const allResources = useSelector(state => state.apps.resources.list)
  const allNotes = useSelector(state => state.apps.notes.list)
  const allPracticals = useSelector(state => state.apps.practicals.list)

  const appsDataArray = [
    {
      name: 'Tasks',
      icon: 'paw',
      count: allTasks.length,
      show: showTasks,
      sortedCount: sortedTasks,
      setSortedCount: setSortedTasks,
      setShow: setShowTasks,
      data: <Tasks setSortedTasks={setSortedTasks} />,
    },
    {
      name: 'Resources',
      icon: 'circle',
      count: allResources.length,
      show: showResources,
      setShow: setShowResources,
      data: <Resources />,
    },
    {
      name: 'Notes',
      icon: 'certificate',
      count: allNotes.length,
      show: showNotes,
      setShow: setShowNotes,
      data: <Notes />,
    },
    {
      name: 'Practicals',
      icon: 'asterisk',
      count: allPracticals.length,
      show: showPracticals,
      setShow: setShowPracticals,
      data: <Practicals />,
    },
  ]

  const SortedAppsData = _.orderBy(appsDataArray, ['count'], ['desc'])

  return (
    <div className='col scrolling-wrapper'>
      {SortedAppsData.map(item => (
        <DataColumn
          key={item.name}
          data={item.data}
          name={item.name}
          icon={item.icon}
          show={item.show}
          setShow={item.setShow}
          sortedCount={item.sortedCount}
          setSortedCount={item.setSortedCount}
        />
      ))}
      <div
        style={{ minWidth: 30, backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
      ></div>
    </div>
  )
}

export default AppsData
