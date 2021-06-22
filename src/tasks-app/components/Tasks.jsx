import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  loadTasks,
  patchTask,
  deleteTask,
  toggleTaskProp,
  setSelectedTask,
} from '../../store/apps/tasksActions'
import _ from 'lodash'
import SortTasks from './SortTasks'
import HeaderCard from '../../common/HeaderCard'
import TasksForm from './TasksForm'
import TasksCard from './TasksCard'
import { appsHeaderAndFormStyle } from '../../services/stylesService'

const Tasks = () => {
  const [showForm, setShowForm] = useState(false)
  const [sortTarget, setSortTarget] = useState({
    path: 'initial',
    order: 'asc',
  })

  const dispatch = useDispatch()
  const tasks = useSelector(state => state.apps.tasks.list)
  const selectedSubject = useSelector(
    state => state.apps.subjects.selectedSubject
  )
  const user = useSelector(state => state.auth.user)

  useEffect(() => {
    dispatch(loadTasks())
  }, [])

  const handleDelete = task => {
    dispatch(deleteTask(task._id))
  }

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleTaskSelect = task => {
    dispatch(setSelectedTask(task))
    handleShowForm()
    scrollTop()
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
      <div className='sticky-top' style={appsHeaderAndFormStyle}>
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
    </>
  )
}

export default Tasks
