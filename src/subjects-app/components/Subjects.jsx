import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  loadSubjects,
  patchSubject,
  toggleSubjectProp,
  deleteSubject,
} from '../../store/apps/subjectsActions'
import { setSelectedSubject } from '../../store/ui/uiParams'
import _ from 'lodash'
import HeaderCard from '../../common/HeaderCard'
import SubjectsCard from './SubjectsCard'
import SubjectsForm from './SubjectsForm'

const Subjects = ({
  user,
  selectedSubject,
  allTasks,
  allResources,
  allNotes,
  allPracticals,
}) => {
  const [showForm, setShowForm] = useState(false)
  const allSubjects = { key: 'key', name: 'All Subjects' }
  const dispatch = useDispatch()
  const subjects = useSelector(state => state.apps.subjects.list)

  useEffect(() => {
    dispatch(loadSubjects())
  }, [])

  const handleDelete = subject => {
    dispatch(deleteSubject(subject._id))
  }

  const handleToggleProp = (subject, property) => {
    const newSubjects = [...subjects]
    const index = newSubjects.indexOf(subject)
    const subjectToUpdate = { ...newSubjects[index] }
    subjectToUpdate[property] = !subjectToUpdate[property]
    const update = { [property]: subjectToUpdate[property] }

    dispatch(patchSubject(subject._id, update))
    dispatch(toggleSubjectProp(subject._id, property))
  }

  const handleSubjectSelect = subject => {
    dispatch(setSelectedSubject(subject))
  }

  const handleSubjectEditSelect = subject => {
    handleShowForm()
  }

  const handleShowForm = () => {
    setShowForm(showForm ? false : true)
  }

  const sortSubjects = () => {
    let data = [...subjects]
    delete data[0]
    let pinnedSubjects = data.filter(s => s.isPinned)
    pinnedSubjects = _.orderBy(pinnedSubjects, ['name'], ['asc'])
    let notPinnedSubjects = data.filter(s => !s.isPinned)
    notPinnedSubjects = _.orderBy(notPinnedSubjects, ['name'], ['asc'])
    return [allSubjects, ...pinnedSubjects, ...notPinnedSubjects]
  }

  const sorted = sortSubjects()

  return (
    <>
      <HeaderCard
        user={user}
        count={sorted.length - 1}
        item='Subjects'
        onClick={handleShowForm}
        showForm={showForm}
      />
      {showForm && (
        <SubjectsForm
          user={user}
          subjects={sorted}
          toggleShowForm={handleShowForm}
          selectedSubject={selectedSubject}
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
          allTasks={allTasks}
          allResources={allResources}
          allNotes={allNotes}
          allPracticals={allPracticals}
          allSubjects={allSubjects}
        />
      ))}
    </>
  )
}

export default Subjects
