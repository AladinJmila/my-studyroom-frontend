import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import HeaderCard from '../../common/HeaderCard'
import NotesForm from './NotesForm'
import SortNotes from './SortNotes'
import NotesCard from './NotesCard'
import {
  loadNotes,
  patchNote,
  deleteNote,
  toggleNoteProp,
  setSelectedNote,
} from './../../store/apps/notesActions'

const Notes = () => {
  const [showForm, setShowForm] = useState(false)
  const [sortTarget, setSortTarget] = useState({
    path: 'initial',
    order: 'asc',
  })

  const dispatch = useDispatch()
  const notes = useSelector(state => state.apps.notes.list)
  const selectedSubject = useSelector(
    state => state.apps.subjects.selectedSubject
  )
  const user = useSelector(state => state.auth.user)

  useEffect(() => {
    dispatch(loadNotes())
  }, [])

  const handleDelete = note => {
    dispatch(deleteNote(note._id))
  }

  const handleNoteSelect = note => {
    dispatch(setSelectedNote(note))
    handleShowForm()
  }

  const onSort = sortTarget => {
    setSortTarget(sortTarget)
  }

  const handleToggleProp = (note, property) => {
    const index = notes.indexOf(note)
    const noteToUpdate = { ...notes[index] }
    noteToUpdate[property] = !noteToUpdate[property]
    const update = { [property]: noteToUpdate[property] }

    dispatch(patchNote(note._id, update))
    dispatch(toggleNoteProp(note._id, property))
  }

  const handleShowForm = () => {
    setShowForm(showForm ? false : true)
  }

  const filtered =
    selectedSubject && selectedSubject._id
      ? notes.filter(n => n.subject._id === selectedSubject._id)
      : notes

  const sorted = _.orderBy(filtered, [sortTarget.path], [sortTarget.order])

  return (
    <>
      <div className='sticky-top'>
        <HeaderCard
          user={user}
          count={sorted.length}
          item='Notes'
          onClick={handleShowForm}
          showForm={showForm}
        />
        {showForm && (
          <NotesForm
            user={user}
            notes={notes}
            toggleShowForm={handleShowForm}
          />
        )}
        <table className='table'>
          <SortNotes sortTarget={sortTarget} onSort={onSort} />
        </table>
      </div>
      {sorted.map(note => (
        <NotesCard
          user={user}
          key={note._id}
          note={note}
          onDelete={handleDelete}
          onEdit={handleNoteSelect}
          onToggleProp={handleToggleProp}
        />
      ))}
    </>
  )
}

export default Notes
