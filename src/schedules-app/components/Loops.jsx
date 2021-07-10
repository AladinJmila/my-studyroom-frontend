import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cardsBody } from '../../services/stylesService'
import HeaderCard from '../../common/HeaderCard'
import LoopsFrom from './LoopsForm'
import { loadLoops } from './../../store/apps/loopsActions'
import LoopsCard from '../LoopsCard'

const Loops = () => {
  const [showForm, setShowForm] = useState(false)

  const dispatch = useDispatch()

  const loops = useSelector(state => state.apps.loops.list)
  const intervals = useSelector(state => state.apps.intervals.list)
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(loadLoops())
  }, [])

  const handleShowForm = () => {
    setShowForm(showForm ? false : true)
  }

  return (
    <>
      <HeaderCard
        user={user}
        count={0}
        item='Loops'
        onClick={handleShowForm}
        showForm={showForm}
      />
      {showForm && <LoopsFrom user={user} toggleShowForm={handleShowForm} />}
      <div style={{ ...cardsBody, padding: '5px 0', marginTop: 10 }}>
        {loops &&
          loops.map(loop => (
            <LoopsCard
              user={user}
              key={loop._id}
              loop={loop}
              intervals={intervals}
            />
          ))}
      </div>
    </>
  )
}

export default Loops
