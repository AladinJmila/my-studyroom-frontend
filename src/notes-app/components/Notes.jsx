import { useState, useEffect } from 'react'
import { getNotes, deleteNote, saveNote } from '../../services/notesService'
import HeaderCard from '../../common/HeaderCard'
import NotesForm from './NotesForm'
import NotesCard from './NotesCard'

const Notes = ({ user, selectedSubject, setAllNotes }) => {
  const [notes, setNotes] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [selectedNote, setSelectedNote] = useState()

  useEffect(async () => {
    const { data: notes } = await getNotes()
    setNotes(notes)
    setAllNotes(notes)
  }, [])

  const handleDelete = async note => {
    const updatedNotes = notes.filter(n => n._id !== note._id)
    setNotes(updatedNotes)
    setAllNotes(updatedNotes)
    await deleteNote(note._id)
  }

  const handleNoteSelect = note => {
    setSelectedNote(note)
    handleShowForm()
  }

  const handleToggleProp = async (note, property) => {
    const newNotes = [...notes]
    const index = newNotes.indexOf(note)
    newNotes[index] = { ...note }
    newNotes[index][property] = !newNotes[index][property]

    let updatedNote = { ...newNotes[index] }
    updatedNote.subjectId = updatedNote.subject._id
    delete updatedNote.subject
    delete updatedNote.__v

    if (note.resource) {
      updatedNote.resourceId = updatedNote.resource._id
      delete updatedNote.resource
    }

    await saveNote(updatedNote)

    setNotes(newNotes)
    setAllNotes(newNotes)
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
          setNotes={setNotes}
          showForm={handleShowForm}
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
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
