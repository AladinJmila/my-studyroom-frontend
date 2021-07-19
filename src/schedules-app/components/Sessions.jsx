import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cardsBody } from '../../services/stylesService'
import HeaderCard from '../../common/HeaderCard'
import SessionsForm from './SessionsFrom'
import {
  loadSessions,
  patchSession,
  deleteSession,
  setSelectedSession,
  toggleSessionProp,
} from '../../store/apps/sessionsActions'
import SessionsCard from './SessionsCard'

const Sessions = () => {
  const [showForm, setShowForm] = useState(false)

  const dispatch = useDispatch()

  const sessions = useSelector(state => state.apps.sessions.list)
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(loadSessions())
  }, [])

  const handleDelete = session => {
    dispatch(deleteSession(session._id))
  }

  const handleSessionSelect = session => {
    dispatch(setSelectedSession(session))
    handleShowForm()
  }

  const handleToggleProp = (session, property) => {
    const index = sessions.indexOf(session)
    const sessionToUpdate = { ...sessions[index] }
    sessionToUpdate[property] = !sessionToUpdate[property]
    const update = { [property]: sessionToUpdate[property] }

    dispatch(patchSession(session._id, update))
    dispatch(toggleSessionProp(session._id, property))
  }

  const handleShowForm = () => {
    setShowForm(showForm ? false : true)
  }

  return (
    <>
      <div className='sticky-top'>
        <HeaderCard
          user={user}
          count={sessions.length}
          item='Sessions'
          onClick={handleShowForm}
          showForm={showForm}
        />
      </div>
      {showForm && <SessionsForm user={user} toggleShowForm={handleShowForm} />}
      <div style={{ ...cardsBody, padding: '5px 0', margin: '10px 0' }}>
        {sessions &&
          sessions.map(session => (
            <SessionsCard
              key={session._id}
              user={user}
              session={session}
              onToggleProp={handleToggleProp}
              onDelete={handleDelete}
              onEdit={handleSessionSelect}
            />
          ))}
      </div>
    </>
  )
}

export default Sessions
