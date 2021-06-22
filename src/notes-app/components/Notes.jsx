import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HeaderCard from '../../common/HeaderCard'
import NotesForm from './NotesForm'
import NotesCard from './NotesCard'
import {
  loadNotes,
  patchNote,
  deleteNote,
  toggleNoteProp,
  setSelectedNote,
  // setFilteredNotes,
} from './../../store/apps/notesActions'

const Notes = () => {
  const [showForm, setShowForm] = useState(false)

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

  const handleToggleProp = (note, property) => {
    const index = notes.indexOf(note)
    const noteToUpdate = { ...notes[index] }
    noteToUpdate[property] = !noteToUpdate[index]
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

  // dispatch(setFilteredNotes(filtered))
  // if (selectedSubject) dispatch(setFilteredNotes(filtered))

  return (
    <>
      <HeaderCard
        user={user}
        count={filtered.length}
        item='Notes'
        onClick={handleShowForm}
        showForm={showForm}
      />
      {showForm && (
        <NotesForm user={user} notes={notes} toggleShowForm={handleShowForm} />
      )}
      {filtered.map(note => (
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
