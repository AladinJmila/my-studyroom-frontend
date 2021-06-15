import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  getPracticals,
  deletePractical,
  savePractical,
} from '../../services/practicalsService'
import HeaderCard from '../../common/HeaderCard'
import PracticalsForm from './PracticalsForm'
import PracticalsCard from './PracticalsCard'

const Practicals = ({ user, setAllPracticals }) => {
  const [practicals, setPracticals] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [selectedPractical, setSelectedPractical] = useState()

  const selectedSubject = useSelector(state => state.ui.selectedSubject)

  useEffect(async () => {
    const { data: practicals } = await getPracticals()
    setPracticals(practicals)
    setAllPracticals(practicals)
  }, [])

  const handleDelete = async practical => {
    const updatedPracticals = practicals.filter(p => p._id !== practical._id)
    setPracticals(updatedPracticals)
    setAllPracticals(updatedPracticals)

    await deletePractical(practical._id)
  }

  const handlePracticalSelect = practical => {
    setSelectedPractical(practical)
    handleShowForm()
  }

  const handleToggleProp = async (practical, property) => {
    const newPracticals = [...practicals]
    const index = newPracticals.indexOf(practical)
    newPracticals[index][property] = !newPracticals[index][property]

    const updatedPractical = { ...newPracticals[index] }
    updatedPractical.subjectId = updatedPractical.subject._id
    delete updatedPractical.subject
    delete updatedPractical.__v

    await savePractical(updatedPractical)

    setPracticals(newPracticals)
    setAllPracticals(newPracticals)
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
          setPracticals={setPracticals}
          showForm={handleShowForm}
          selectedPractical={selectedPractical}
          setSelectedPractical={setSelectedPractical}
          setAllPracticals={setAllPracticals}
        />
      )}
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
