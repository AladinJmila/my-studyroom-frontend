import { divide } from 'lodash'
import PublicNotes from './PublicNotes'
import PublicResources from './PublicResources'
import PublicTasks from './PublicTasks'

const SubjectDetailsWrapper = () => {
  const subjectContentArray = [
    {
      name: 'Tasks',
      // count: pbulicTasksCount,
      // show: showTasks,
      // setShow: setShowTasks,
      data: <PublicTasks />,
    },
    {
      name: 'Resources',
      // count: pbulicTasksCount,
      // show: showTasks,
      // setShow: setShowTasks,
      data: <PublicResources />,
    },
    {
      name: 'StudyNotes',
      // count: pbulicTasksCount,
      // show: showTasks,
      // setShow: setShowTasks,
      data: <PublicNotes />,
    },
    {
      name: 'PracticeNotes',
      // count: pbulicTasksCount,
      // show: showTasks,
      // setShow: setShowTasks,
      data: null,
    },
  ]
  return (
    <div>
      {subjectContentArray.map(item => (
        <div key={item.name}>
          <h4>{item.name}</h4>
          <div>{item.data}</div>
        </div>
      ))}
    </div>
  )
}

export default SubjectDetailsWrapper
