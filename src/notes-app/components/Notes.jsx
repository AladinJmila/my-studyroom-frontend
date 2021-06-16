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
} from './../../store/apps/notesActions'

const Notes = ({ user, setAllNotes }) => {
  const [showForm, setShowForm] = useState(false)

  const dispatch = useDispatch()
  const notes = useSelector(state => state.apps.notes.list)
  const selectedSubject = useSelector(state => state.ui.selectedSubject)

  useEffect(() => {
    dispatch(loadNotes())
    setAllNotes(notes)
  }, [])

  const handleDelete = note => {
    dispatch(deleteNote(note._id))
    dispatch(loadNotes())
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
    setAllNotes(notes)
  }

  const handleShowForm = () => {
    setShowForm(showForm ? false : true)
  }

  const flitered =
    selectedSubject && selectedSubject._id
      ? notes.filter(n => n.subject._id === selectedSubject._id)
      : notes

  return (
    <>
      <HeaderCard
        user={user}
        count={flitered.length}
        item='Notes'
        onClick={handleShowForm}
        showForm={showForm}
      />
      {showForm && (
        <NotesForm
          user={user}
          notes={notes}
          toggleShowForm={handleShowForm}
          setAllNotes={setAllNotes}
        />
      )}
      {flitered.map(note => (
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
