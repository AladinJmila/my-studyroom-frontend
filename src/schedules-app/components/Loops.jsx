import { useState } from 'react'
import { useSelector } from 'react-redux'
import HeaderCard from '../../common/HeaderCard'

const Loops = () => {
  const [showForm, setShowForm] = useState(false)
  const { user } = useSelector(state => state.auth)

  const handleShowForm = () => {
    setShowForm(showForm ? false : true)
  }

  return (
    <div>
      <HeaderCard
        user={user}
        count={0}
        item='Loops'
        onClick={handleShowForm}
        showForm={showForm}
      />
    </div>
  )
}

export default Loops
