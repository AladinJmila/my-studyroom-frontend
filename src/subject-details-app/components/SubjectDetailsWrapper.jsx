import { useState } from 'react'
import PublicNotes from './PublicNotes'
import PublicPracticals from './PublicPracticals'
import PublicResources from './PublicResources'
import PublicTasks from './PublicTasks'
import HorizontalFoldingBar from './HorizontalFoldingBar'

const SubjectDetailsWrapper = () => {
  const [showPracticals, setShowPracticals] = useState(false)
  const [showResources, setShowResources] = useState(false)
  const [showNotes, setShowNotes] = useState(false)
  const [showTasks, setShowTasks] = useState(false)

  const subjectContentArray = [
    {
      name: 'Tasks',
      // count: pbulicTasksCount,
      show: showTasks,
      setShow: setShowTasks,
      data: <PublicTasks />,
    },
    {
      name: 'Resources',
      // count: pbulicTasksCount,
      show: showResources,
      setShow: setShowResources,
      data: <PublicResources />,
    },
    {
      name: 'StudyNotes',
      // count: pbulicTasksCount,
      show: showNotes,
      setShow: setShowNotes,
      data: <PublicNotes />,
    },
    {
      name: 'PracticeNotes',
      // count: pbulicTasksCount,
      show: showPracticals,
      setShow: setShowPracticals,
      data: <PublicPracticals />,
    },
  ]
  return (
    <div>
      {subjectContentArray.map(item => (
        <div key={item.name}>
          <HorizontalFoldingBar
            name={item.name}
            show={item.show}
            setShow={item.setShow}
          />
          <div>{item.data}</div>
        </div>
      ))}
    </div>
  )
}

export default SubjectDetailsWrapper
