import { useState } from 'react'
import { useSelector } from 'react-redux'
import HeaderCard from './../../common/HeaderCard'

const VisualNotes = () => {
  const [showForm, setShowForm] = useState(false)
  const { user } = useSelector(state => state.auth)

  const handleShowForm = () => {
    setShowForm(showForm ? false : true)
  }

  return (
    <>
      <div className='sticky-top'>
        <HeaderCard
          user={user}
          count={0}
          item='VisualNotes'
          onClick={handleShowForm}
          showForm={showForm}
        />
      </div>
    </>
  )
}

export default VisualNotes
