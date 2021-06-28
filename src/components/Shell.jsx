import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Subjects from '../subjects-app/components/Subjects'
import AppsData from '../shell-app/components/AppsData'
import ToggleSideTab from './../common/ToggleSideTab'
import BeatLoader from 'react-spinners/BeatLoader'

function Shell() {
  const [orderedData, setOrderedData] = useState([])
  const [showSubjects, setShowSubjects] = useState(true)
  // const [loading, setLoading] = useState(false)
  // const loading = useSelector(state => state.apps.tasks.loading)

  const subjectsStyle = {
    paddingRight: '0',
    minWidth: 300,
    display: 'block',
  }

  useEffect(() => {
    // setLoading(true)
    // setTimeout(() => {
    //   setLoading(false)
    // }, 2000)
  }, [])

  subjectsStyle.display = showSubjects ? 'block' : 'none'

  return (
    <>
      {/* {loading ? (
        <div className='center-spinner'>
          <BeatLoader size={50} color={'#6A7475'} loading={loading} />
        </div>
      ) : ( */}
      <main className='row pl-2 mr-1 pt-3 flex-nowrap'>
        <ToggleSideTab
          label='Subjects'
          show={showSubjects}
          setShow={setShowSubjects}
        />
        <div style={subjectsStyle} className='col-2 y-scroll subjects'>
          <h2>
            {/* <h2 style={appColumnsTitle} className='sticky-top'> */}
            Subjects
          </h2>
          <div>
            <Subjects
              setOrderedData={setOrderedData}
              orderedData={orderedData}
            />
          </div>
        </div>
        <AppsData className='position-static' />
      </main>
      {/* )} */}
    </>
  )
}

export default Shell
