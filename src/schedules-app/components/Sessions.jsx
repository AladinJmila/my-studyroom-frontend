import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cardsBody } from '../../services/stylesService'
import HeaderCard from '../../common/HeaderCard'
import SessionsForm from './SessionsFrom'
import SessionsCard from './SessionsCard'
import {
  loadSessions,
  patchSession,
  deleteSession,
  setSelectedSession,
  setPlayingSession,
  clearPlayingSession,
  toggleSessionProp,
} from '../../store/apps/sessionsActions'
import { setPlayingLoop, clearPlayingLoop } from '../../store/apps/loopsActions'

const Sessions = () => {
  const [showForm, setShowForm] = useState(false)

  const dispatch = useDispatch()

  const loops = useSelector(state => state.apps.loops.list)
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

  const handlePlay = session => {
    const index = sessions.indexOf(session)
    const sessionToUpdate = { ...sessions[index] }
    sessionToUpdate.isPlaying = !sessionToUpdate.isPlaying
    const update = { isPlaying: sessionToUpdate.isPlaying }

    const loop = loops.find(l => l._id === session.loop._id)
    if (sessionToUpdate.isPlaying) {
      dispatch(setPlayingSession(session))
      dispatch(setPlayingLoop(loop))
    } else {
      dispatch(clearPlayingSession())
      dispatch(clearPlayingLoop())
    }

    dispatch(patchSession(session._id, update))
    dispatch(toggleSessionProp(session._id, 'isPlaying'))
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
              onPlay={handlePlay}
            />
          ))}
      </div>
    </>
  )
}

export default Sessions
