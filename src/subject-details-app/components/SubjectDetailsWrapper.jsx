import { useState } from 'react'
import PublicNotes from './PublicNotes'
import PublicPracticals from './PublicPracticals'
import PublicResources from './PublicResources'
import PublicTasks from './PublicTasks'
import HorizontalFoldingBar from './HorizontalFoldingBar'

const SubjectDetailsWrapper = ({ subject }) => {
  const [showPracticals, setShowPracticals] = useState(false)
  const [showResources, setShowResources] = useState(false)
  const [showNotes, setShowNotes] = useState(false)
  const [showTasks, setShowTasks] = useState(false)

  const subjectContentArray = [
    {
      name: 'Tasks',
      data: <PublicTasks />,
      show: showTasks,
      setShow: setShowTasks,
      count: subject.numberOfPublicTasks,
    },
    {
      name: 'Resources',
      data: <PublicResources />,
      show: showResources,
      setShow: setShowResources,
      count: subject.numberOfPublicResources,
    },
    {
      name: 'StudyNotes',
      data: <PublicNotes />,
      show: showNotes,
      setShow: setShowNotes,
      count: subject.numberOfPublicNotes,
    },
    {
      name: 'PracticeNotes',
      data: <PublicPracticals />,
      show: showPracticals,
      setShow: setShowPracticals,
      count: subject.numberOfPublicPracticals,
    },
  ]
  return (
    <div>
      {subjectContentArray.map(item => (
        <div key={item.name}>
          <HorizontalFoldingBar
            name={item.name}
            show={item.show}
            count={item.count}
            setShow={item.setShow}
          />
          {item.show && <div>{item.data}</div>}
        </div>
      ))}
    </div>
  )
}

export default SubjectDetailsWrapper
