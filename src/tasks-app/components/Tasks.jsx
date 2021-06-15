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

const Tasks = ({ user, setAllTasks, setSortedTasks }) => {
  const [showForm, setShowForm] = useState(false)
  const [sortTarget, setSortTarget] = useState({
    path: 'initial',
    order: 'asc',
  })

  const dispatch = useDispatch()
  const tasks = useSelector(state => state.apps.tasks.list)
  const selectedSubject = useSelector(state => state.ui.selectedSubject)

  useEffect(() => {
    dispatch(loadTasks())
    setAllTasks(tasks)
  }, [])

  const handleDelete = task => {
    dispatch(deleteTask(task._id))
    dispatch(loadTasks())
  }

  const handleTaskSelect = task => {
    dispatch(setSelectedTask(task))
    handleShowForm()
  }

  const onSort = sortTarget => {
    setSortTarget(sortTarget)
  }

  const handleToggleProp = (task, property) => {
    const newTasks = [...tasks]
    const index = newTasks.indexOf(task)
    const taskToUpdate = { ...newTasks[index] }
    taskToUpdate[property] = !taskToUpdate[property]
    const update = { [property]: taskToUpdate[property] }

    dispatch(patchTask(task._id, update))
    dispatch(toggleTaskProp(task._id, property))
    setAllTasks(newTasks)
  }

  const handleShowForm = () => {
    setShowForm(showForm ? false : true)
  }

  const filtered =
    selectedSubject && selectedSubject._id
      ? tasks.filter(t => t.subject._id === selectedSubject._id)
      : tasks

  const sorted = _.orderBy(filtered, [sortTarget.path], [sortTarget.order])
  const checked = sorted.filter(t => t.isChecked === true)

  // setSortedTasks(sorted.length)
  // console.log(sorted.length)

  return (
    <>
      <HeaderCard
        user={user}
        count={sorted.length}
        outOfCount={checked.length}
        item='Tasks'
        onClick={handleShowForm}
        showForm={showForm}
      />
      {showForm && (
        <TasksForm
          user={user}
          tasks={tasks}
          toggleShowForm={handleShowForm}
          setAllTasks={setAllTasks}
        />
      )}
      <table className='table'>
        <SortTasks sortTarget={sortTarget} onSort={onSort} />
      </table>
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
