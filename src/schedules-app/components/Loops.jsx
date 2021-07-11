import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cardsBody } from '../../services/stylesService'
import HeaderCard from '../../common/HeaderCard'
import LoopsFrom from './LoopsForm'
import {
  loadLoops,
  patchLoop,
  deleteLoop,
  setSelectedLoop,
  toggleLoopProp,
} from './../../store/apps/loopsActions'
import LoopsCard from './LoopsCard'

const Loops = () => {
  const [showForm, setShowForm] = useState(false)

  const dispatch = useDispatch()

  const loops = useSelector(state => state.apps.loops.list)
  const intervals = useSelector(state => state.apps.intervals.list)
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(loadLoops())
  }, [])

  const handleDelete = loop => {
    dispatch(deleteLoop(loop._id))
  }

  const handleLoopSelect = loop => {
    dispatch(setSelectedLoop(loop))
    handleShowForm()
  }

  const handleToggleProp = (loop, property) => {
    const index = loops.indexOf(loop)
    const loopToUpdate = { ...loops[index] }
    loopToUpdate[property] = !loopToUpdate[property]
    const update = { [property]: loopToUpdate[property] }

    dispatch(patchLoop(loop._id, update))
    dispatch(toggleLoopProp(loop._id, property))
  }

  const handleShowForm = () => {
    setShowForm(showForm ? false : true)
  }

  return (
    <>
      <HeaderCard
        user={user}
        count={loops.length}
        item='Loops'
        onClick={handleShowForm}
        showForm={showForm}
      />
      {showForm && <LoopsFrom user={user} toggleShowForm={handleShowForm} />}
      <div style={{ ...cardsBody, padding: '5px 0', margin: '10px 0' }}>
        {loops &&
          loops.map(loop => (
            <LoopsCard
              user={user}
              key={loop._id}
              loop={loop}
              intervals={intervals}
              onToggleProp={handleToggleProp}
              onDelete={handleDelete}
              onEdit={handleLoopSelect}
            />
          ))}
      </div>
    </>
  )
}

export default Loops
