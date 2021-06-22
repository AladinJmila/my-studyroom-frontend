import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HeaderCard from '../../common/HeaderCard'
import PracticalsForm from './PracticalsForm'
import PracticalsCard from './PracticalsCard'
import {
  loadPracticals,
  patchPractical,
  deletePractical,
  togglePracticalProp,
  setSelectedPractical,
} from './../../store/apps/practicalsActions'

const Practicals = () => {
  const [showForm, setShowForm] = useState(false)

  const dispatch = useDispatch()
  const practicals = useSelector(state => state.apps.practicals.list)
  const selectedSubject = useSelector(
    state => state.apps.subjects.selectedSubject
  )
  const user = useSelector(state => state.auth.user)

  useEffect(() => {
    dispatch(loadPracticals())
  }, [])

  const handleDelete = practical => {
    dispatch(deletePractical(practical._id))
  }

  const handlePracticalSelect = practical => {
    dispatch(setSelectedPractical(practical))
    handleShowForm()
  }

  const handleToggleProp = (practical, property) => {
    const index = practicals.indexOf(practical)
    const practicalToUpdate = { ...practicals[index] }
    practicalToUpdate[property] = !practicalToUpdate[property]
    const update = { [property]: practicalToUpdate[property] }

    dispatch(patchPractical(practical._id, update))
    dispatch(togglePracticalProp(practical._id, property))
  }

  const handleShowForm = () => {
    setShowForm(showForm ? false : true)
  }

  const filtered =
    selectedSubject && selectedSubject._id
      ? practicals.filter(m => m.subject._id === selectedSubject._id)
      : practicals

  return (
    <>
      <div className='sticky-top'>
        <HeaderCard
          user={user}
          count={filtered.length}
          item='Practicals'
          onClick={handleShowForm}
          showForm={showForm}
        />
        {showForm && (
          <PracticalsForm
            user={user}
            practicals={practicals}
            toggleShowForm={handleShowForm}
          />
        )}
      </div>
      {filtered.map(practical => (
        <PracticalsCard
          user={user}
          key={practical._id}
          practical={practical}
          onDelete={handleDelete}
          onEdit={handlePracticalSelect}
          onToggleProp={handleToggleProp}
        />
      ))}
    </>
  )
}

export default Practicals
