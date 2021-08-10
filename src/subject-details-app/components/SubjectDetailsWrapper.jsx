import { divide } from 'lodash'
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
      data: null,
    },
    {
      name: 'StudyNotes',
      // count: pbulicTasksCount,
      // show: showTasks,
      // setShow: setShowTasks,
      data: null,
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
      <h3>Subject Details Wrapper</h3>
      {subjectContentArray.map(item => (
        <div key={item.name}>
          <div>{item.name}</div>
          <div>{item.data}</div>
        </div>
      ))}
    </div>
  )
}

export default SubjectDetailsWrapper
