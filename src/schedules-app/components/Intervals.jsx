import { useState } from 'react'
import { useSelector } from 'react-redux'
import HeaderCard from './../../common/HeaderCard'
import IntervalsForm from './IntervalsForm'

const Intervals = () => {
  const [showForm, setShowForm] = useState(false)
  const { user } = useSelector(state => state.auth)

  const handleShowForm = () => {
    setShowForm(showForm ? false : true)
  }

  return (
    <>
      <HeaderCard
        user={user}
        count={0}
        item='Intervals'
        onClick={handleShowForm}
        showForm={showForm}
      />
      <IntervalsForm />
    </>
  )
}

export default Intervals
