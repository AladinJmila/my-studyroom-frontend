import { useState } from 'react'
import Subjects from '../subjects-app/components/Subjects'
import AppsData from '../shell-app/components/AppsData'

function Shell({ user }) {
  const [selectedSubject, setSelectedSubject] = useState()
  const [allTasks, setAllTasks] = useState([])
  const [allResources, setAllResources] = useState([])
  const [allNotes, setAllNotes] = useState([])
  const [allPracticals, setAllPracticals] = useState([])
  const [orderedData, setOrderedData] = useState([])
  // const [appsData, setAppsData] = useState([])
  // const [updateUi, setUpdateUi] = useState(false)

  return (
    <main
      style={{ backgroundImage: 'linear-gradient(#eed1ff, #ff9c9c)' }}
      className='row pt-3'
    >
      <div
        style={{ paddingRight: '0', minWidth: 300 }}
        className='col-2 y-scroll'
      >
        <h2>Subjects</h2>
        <Subjects
          user={user}
          setSelectedSubject={setSelectedSubject}
          selectedSubject={selectedSubject}
          setOrderedData={setOrderedData}
          // setUpdateUi={setUpdateUi}
          // updateUi={updateUi}
          orderedData={orderedData}
          allTasks={allTasks}
          allResources={allResources}
          allNotes={allNotes}
          allPracticals={allPracticals}
        />
      </div>
      <AppsData
        user={user}
        selectedSubject={selectedSubject}
        allTasks={allTasks}
        setAllTasks={setAllTasks}
        allResources={allResources}
        setAllResources={setAllResources}
        allNotes={allNotes}
        setAllNotes={setAllNotes}
        allPracticals={allPracticals}
        setAllPracticals={setAllPracticals}
      />
    </main>
  )
}

export default Shell
