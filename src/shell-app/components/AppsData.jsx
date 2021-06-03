import { useState } from 'react'
import _ from 'lodash'
import Notes from '../../notes-app/components/Notes'
import Tasks from '../../tasks-app/components/Tasks'
import Resources from '../../resources-app/components/Resources'
import Practicals from '../../practicals-app/components/Practicals'
import DataColumn from './DataColumn'

const AppsData = ({
  user,
  selectedSubject,
  allTasks,
  setAllTasks,
  allResources,
  setAllResources,
  allNotes,
  setAllNotes,
  allPracticals,
  setAllPracticals,
}) => {
  const [showPracticals, setShowPracticals] = useState(true)
  const [showResources, setShowResources] = useState(true)
  const [showNotes, setShowNotes] = useState(true)
  const [showTasks, setShowTasks] = useState(true)

  const appsDataArray = [
    {
      name: 'Tasks',
      color: 'rgba(153, 255, 43, 0.4)',
      icon: 'paw',
      count: allTasks.length,
      show: showTasks,
      setShow: setShowTasks,
      data: (
        <Tasks
          user={user}
          selectedSubject={selectedSubject}
          setAllTasks={setAllTasks}
        />
      ),
    },
    {
      name: 'Resources',
      color: 'rgba(43, 255, 188, 0.4)',
      icon: 'circle',
      count: allResources.length,
      show: showResources,
      setShow: setShowResources,
      data: (
        <Resources
          user={user}
          selectedSubject={selectedSubject}
          setAllResources={setAllResources}
        />
      ),
    },
    {
      name: 'Notes',
      color: 'rgba(255, 209, 43, 0.4)',
      icon: 'certificate',
      count: allNotes.length,
      show: showNotes,
      setShow: setShowNotes,
      data: (
        <Notes
          user={user}
          selectedSubject={selectedSubject}
          setAllNotes={setAllNotes}
        />
      ),
    },
    {
      name: 'Practicals',
      color: 'rgba(25, 155, 255, 0.4)',
      icon: 'asterisk',
      count: allPracticals.length,
      show: showPracticals,
      setShow: setShowPracticals,
      data: (
        <Practicals
          user={user}
          selectedSubject={selectedSubject}
          setAllPracticals={setAllPracticals}
        />
      ),
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
          color={item.color}
          icon={item.icon}
          show={item.show}
          setShow={item.setShow}
        />
      ))}
      <div style={{ minWidth: 30, backgroundColor: 'grey' }}></div>
    </div>
  )
}

export default AppsData
