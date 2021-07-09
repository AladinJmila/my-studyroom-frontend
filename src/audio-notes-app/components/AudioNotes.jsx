import { useState } from 'react'
import { useSelector } from 'react-redux'
import HeaderCard from './../../common/HeaderCard'

const AudioNotes = () => {
  const [showForm, setShowFrom] = useState(false)
  const { user } = useSelector(state => state.auth)

  const handleShowForm = () => {
    setShowFrom(showForm ? false : true)
  }

  return (
    <>
      <HeaderCard
        user={user}
        count={0}
        item='AudioNotes'
        onClick={handleShowForm}
        showForm={showForm}
      />
    </>
  )
}

export default AudioNotes
