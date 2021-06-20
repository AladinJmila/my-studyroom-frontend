import { useState } from 'react'
import Subjects from '../subjects-app/components/Subjects'
import AppsData from '../shell-app/components/AppsData'
import ToggleSideTab from './../common/ToggleSideTab'

function Shell() {
  const [orderedData, setOrderedData] = useState([])
  const [showSubjects, setShowSubjects] = useState(true)

  const subjectsStyle = {
    paddingRight: '0',
    minWidth: 300,
    display: 'block',
  }

  subjectsStyle.display = showSubjects ? 'block' : 'none'

  return (
    <main className='row pl-2 mr-2 pt-3 flex-nowrap'>
      <ToggleSideTab
        label='Subjects'
        show={showSubjects}
        setShow={setShowSubjects}
      />
      <div style={subjectsStyle} className='col-2 y-scroll subjects'>
        <h2>Subjects</h2>
        <div>
          <Subjects setOrderedData={setOrderedData} orderedData={orderedData} />
        </div>
      </div>
      <AppsData className='position-static' />
    </main>
  )
}

export default Shell
