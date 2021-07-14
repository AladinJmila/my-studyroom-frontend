import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cardsBody } from '../../services/stylesService'
import HeaderCard from './../../common/HeaderCard'
import SchedulesForm from './SchedulesFrom'
import {
  loadSchedules,
  patchSchedule,
  deleteSchedule,
  setSelectedSchedule,
  toggleScheduleProp,
} from './../../store/apps/schedulesActions'
import SchedulesCard from './SchedulesCard'

const Schedules = () => {
  const [showForm, setShowForm] = useState(false)

  const dispatch = useDispatch()

  const schedules = useSelector(state => state.apps.schedules.list)
  const intervals = useSelector(state => state.apps.intervals.list)
  const loops = useSelector(state => state.apps.loops.list)
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(loadSchedules())
  }, [])

  const handleDelete = schedule => {
    dispatch(deleteSchedule(schedule._id))
  }

  const handleScheduleSelect = schedule => {
    dispatch(setSelectedSchedule(schedule))
    handleShowForm()
  }

  const handleToggleProp = (schedule, property) => {
    console.log(property)
    const index = schedules.indexOf(schedule)
    const scheduleToUpdate = { ...schedules[index] }
    scheduleToUpdate[property] = !scheduleToUpdate[property]
    const update = { [property]: scheduleToUpdate[property] }

    dispatch(patchSchedule(schedule._id, update))
    dispatch(toggleScheduleProp(schedule._id, property))
  }

  const handleShowForm = () => {
    setShowForm(showForm ? false : true)
  }

  return (
    <>
      <div className='sticky-top'>
        <HeaderCard
          user={user}
          count={schedules.length}
          item='Schedules'
          onClick={handleShowForm}
          showForm={showForm}
        />
      </div>
      {showForm && (
        <SchedulesForm user={user} toggleShowForm={handleShowForm} />
      )}
      <div style={{ ...cardsBody, padding: '5px 0', margin: '10px 0' }}>
        {schedules &&
          schedules.map(schedule => (
            <SchedulesCard
              key={schedule._id}
              user={user}
              schedule={schedule}
              intervals={intervals}
              loops={loops}
              onToggleProp={handleToggleProp}
              onDelete={handleDelete}
              onEdit={handleScheduleSelect}
            />
          ))}
      </div>
    </>
  )
}

export default Schedules
