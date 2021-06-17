import { useState } from 'react'
import Subjects from '../subjects-app/components/Subjects'
import AppsData from '../shell-app/components/AppsData'

function Shell() {
  const [orderedData, setOrderedData] = useState([])

  return (
    <main className='row pl-2 mr-2 pt-3'>
      <div
        style={{ paddingRight: '0', minWidth: 300 }}
        className='col-2 y-scroll'
      >
        <h2>Subjects</h2>
        <Subjects setOrderedData={setOrderedData} orderedData={orderedData} />
      </div>
      <AppsData />
    </main>
  )
}

export default Shell
