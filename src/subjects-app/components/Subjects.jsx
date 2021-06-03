import { useState, useEffect } from 'react'
import {
  getSubjects,
  deleteSubject,
  saveSubject,
} from '../../services/subjectsService'
import _ from 'lodash'
import HeaderCard from '../../common/HeaderCard'
import SubjectsCard from './SubjectsCard'
import SubjectsForm from './SubjectsForm'

const Subjects = ({
  user,
  setSelectedSubject,
  selectedSubject,
  allTasks,
  allResources,
  allNotes,
  allPracticals,
}) => {
  const [subjects, setSubjects] = useState([])
  const [showForm, setShowForm] = useState(false)

  const firstSubject = { key: 'key', name: 'All Subjects' }

  useEffect(async () => {
    const { data } = await getSubjects()

    const subjects = [firstSubject, ...data]
    setSubjects(subjects)
  }, [])

  const handleDelete = async subject => {
    const updatedSubjects = subjects.filter(s => s._id !== subject._id)
    setSubjects(updatedSubjects)

    await deleteSubject(subject._id)
  }

  const handleToggleProp = async (subject, property) => {
    const newSubjects = [...subjects]
    const index = newSubjects.indexOf(subject)
    newSubjects[index][property] = !newSubjects[index][property]

    const updatedSubject = { ...newSubjects[index] }
    delete updatedSubject.__v

    await saveSubject(updatedSubject)

    setSubjects(newSubjects)
  }

  const handleSubjectSelect = subject => {
    setSelectedSubject(subject)
  }

  const handleSubjectEditSelect = subject => {
    setSelectedSubject(subject)
    handleShowForm()
  }

  const handleShowForm = () => {
    setShowForm(showForm ? false : true)
  }

  if (subjects.length === 0) return <p>There are no subjects in the database</p>

  const sortSubjects = () => {
    let data = [...subjects]
    delete data[0]
    let pinnedSubjects = data.filter(s => s.isPinned)
    pinnedSubjects = _.orderBy(pinnedSubjects, ['name'], ['asc'])
    let notPinnedSubjects = data.filter(s => !s.isPinned)
    notPinnedSubjects = _.orderBy(notPinnedSubjects, ['name'], ['asc'])
    return [firstSubject, ...pinnedSubjects, ...notPinnedSubjects]
  }

  const sorted = sortSubjects()

  return (
    <>
      <HeaderCard
        user={user}
        count={sorted.length}
        item='Subjects'
        onClick={handleShowForm}
        showForm={showForm}
      />
      {showForm && (
        <SubjectsForm
          user={user}
          subjects={sorted}
          setSubjects={setSubjects}
          updateSubjects={handleShowForm}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
        />
      )}
      {sorted.map(subject => (
        <SubjectsCard
          key={subject._id || subject.key}
          user={user}
          subject={subject}
          onSubjectSelect={handleSubjectSelect}
          onToggleProp={handleToggleProp}
          onDelete={handleDelete}
          onEdit={handleSubjectEditSelect}
          selectedSubject={selectedSubject}
          allTasks={allTasks}
          allResources={allResources}
          allNotes={allNotes}
          allPracticals={allPracticals}
          firstSubject={firstSubject}
        />
      ))}
    </>
  )
}

export default Subjects
