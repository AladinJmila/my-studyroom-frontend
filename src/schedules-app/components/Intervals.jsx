import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cardsBody } from '../../services/stylesService'
import {
  loadIntervals,
  patchInterval,
  deleteInterval,
  setSelectedInterval,
  toggleIntervalProp,
} from '../../store/apps/intervalsActions'
import HeaderCard from './../../common/HeaderCard'
import IntervalsCard from './IntervalsCard'
import IntervalsChip from './IntervalsChip'
import IntervalsChipCard from './IntervalsChipCard'
import IntervalsForm from './IntervalsForm'

const Intervals = () => {
  const [showForm, setShowForm] = useState(false)

  const dispatch = useDispatch()

  const intervals = useSelector(state => state.apps.intervals.list)
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(loadIntervals())
  }, [])

  const handleDelete = interval => {
    dispatch(deleteInterval(interval._id))
  }

  const handleIntervalSelect = interval => {
    dispatch(setSelectedInterval(interval))
    handleShowForm()
  }

  const handleToggleProp = (interval, property) => {
    const index = intervals.indexOf(interval)
    const intervalToUpdate = { ...intervals[index] }
    intervalToUpdate[property] = !intervalToUpdate[property]
    const update = { [property]: intervalToUpdate[property] }

    dispatch(patchInterval(interval._id, update))
    dispatch(toggleIntervalProp(interval._id, property))
  }

  const handleShowForm = () => {
    setShowForm(showForm ? false : true)
  }

  return (
    <>
      <HeaderCard
        user={user}
        count={intervals.length}
        item='Intervals'
        onClick={handleShowForm}
        showForm={showForm}
      />
      {showForm && (
        <IntervalsForm user={user} toggleShowForm={handleShowForm} />
      )}
      <div
        className='d-flex flex-wrap'
        style={{ ...cardsBody, padding: 5, marginTop: 10 }}
      >
        {intervals &&
          intervals.map(interval => (
            // <IntervalsChip interval={interval} />
            <IntervalsChipCard
              user={user}
              key={interval._id}
              interval={interval}
              onToggleProp={handleToggleProp}
              onDelete={handleDelete}
              onEdit={handleIntervalSelect}
            />
            // <IntervalsCard
            //   user={user}
            //   key={interval._id}
            //   interval={interval}
            //   onToggleProp={handleToggleProp}
            //   onDelete={handleDelete}
            //   onEdit={handleIntervalSelect}
            // />
          ))}
      </div>
    </>
  )
}

export default Intervals
