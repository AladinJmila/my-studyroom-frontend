import { useState, useEffect } from 'react'
import { getTasks, deleteTask, saveTask } from '../../services/tasksService'
import _ from 'lodash'
import SortTasks from './SortTasks'
import HeaderCard from '../../common/HeaderCard'
import TasksForm from './TasksForm'
import TasksCard from './TasksCard'

const Tasks = ({ user, selectedSubject, setAllTasks, setSortedTasks }) => {
  const [tasks, setTasks] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [selectedTask, setSelectedTask] = useState()
  const [sortTarget, setSortTarget] = useState({
    path: 'initial',
    order: 'asc',
  })

  useEffect(async () => {
    const { data: tasks } = await getTasks()
    setTasks(tasks)
    setAllTasks(tasks)
  }, [])

  const handleDelete = async task => {
    const updatedTasks = tasks.filter(t => t._id !== task._id)
    setTasks(updatedTasks)
    setAllTasks(updatedTasks)

    await deleteTask(task._id)
  }

  const handleTaskSelect = task => {
    setSelectedTask(task)
    handleShowForm()
  }

  const onSort = sortTarget => {
    setSortTarget(sortTarget)
  }

  const handleToggleProp = async (task, property) => {
    const newTasks = [...tasks]
    const index = newTasks.indexOf(task)
    newTasks[index] = { ...task }
    newTasks[index][property] = !newTasks[index][property]

    let updatedTask = { ...newTasks[index] }
    updatedTask.subjectId = updatedTask.subject._id
    delete updatedTask.subject
    delete updatedTask.__v

    if (task.resource) {
      updatedTask.resourceId = updatedTask.resource._id
      delete updatedTask.resource
    }

    await saveTask(updatedTask)

    setTasks(newTasks)
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
          setTasks={setTasks}
          showForm={handleShowForm}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
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
