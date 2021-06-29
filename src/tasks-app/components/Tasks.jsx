import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import SortTasks from './SortTasks'
import HeaderCard from '../../common/HeaderCard'
import TasksForm from './TasksForm'
import TasksCard from './TasksCard'
import { BeatLoader } from 'react-spinners'
import {
  loadTasks,
  patchTask,
  deleteTask,
  toggleTaskProp,
  setSelectedTask,
} from '../../store/apps/tasksActions'

const Tasks = () => {
  const [showForm, setShowForm] = useState(false)
  const [sortTarget, setSortTarget] = useState({
    path: 'initial',
    order: 'asc',
  })

  const dispatch = useDispatch()
  const tasks = useSelector(state => state.apps.tasks.list)
  const { selectedSubject } = useSelector(state => state.apps.subjects)
  const { user } = useSelector(state => state.auth)
  const { loading } = useSelector(state => state.apps.tasks)

  useEffect(() => {
    dispatch(loadTasks())
  }, [])

  const handleDelete = task => {
    dispatch(deleteTask(task._id))
  }

  const handleTaskSelect = task => {
    dispatch(setSelectedTask(task))
    handleShowForm()
  }

  const onSort = sortTarget => {
    setSortTarget(sortTarget)
  }

  const handleToggleProp = (task, property) => {
    const index = tasks.indexOf(task)
    const taskToUpdate = { ...tasks[index] }
    taskToUpdate[property] = !taskToUpdate[property]
    const update = { [property]: taskToUpdate[property] }

    dispatch(patchTask(task._id, update))
    dispatch(toggleTaskProp(task._id, property))
  }

  const handleShowForm = () => {
    setShowForm(showForm ? false : true)
  }

  const filtered =
    selectedSubject && selectedSubject._id
      ? tasks.filter(t => t.subject._id === selectedSubject._id)
      : tasks

  const sorted = _.orderBy(filtered, [sortTarget.path], [sortTarget.order])

  return (
    <>
      <div className='sticky-top'>
        <HeaderCard
          user={user}
          count={sorted.length}
          item='Tasks'
          onClick={handleShowForm}
          showForm={showForm}
        />
        {showForm && (
          <TasksForm
            user={user}
            tasks={tasks}
            toggleShowForm={handleShowForm}
          />
        )}
        <table className='table'>
          <SortTasks sortTarget={sortTarget} onSort={onSort} />
        </table>
      </div>
      {loading ? (
        <div className='center-spinner'>
          <BeatLoader size={50} color={'#3E98C7'} loading={loading} />
        </div>
      ) : (
        <>
          {sorted.map(task => (
            <TasksCard
              key={task._id}
              user={user}
              task={task}
              onToggleProp={handleToggleProp}
              onDelete={handleDelete}
              onEdit={handleTaskSelect}
            />
          ))}
        </>
      )}
    </>
  )
}

export default Tasks
