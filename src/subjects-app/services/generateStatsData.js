export const calculatePercentage = (subject, allTasks) => {
  const checked = allTasks.filter(t => t.isChecked === true)

  if (subject.name === 'All Subjects') {
    return Math.round((checked.length / allTasks.length) * 100)
  }
  const subjectTasks = allTasks.filter(t => t.subject.name === subject.name)
  const checkedSubjectTasks = checked.filter(
    t => t.subject.name === subject.name
  )
  return (
    Math.round((checkedSubjectTasks.length / subjectTasks.length) * 100) || 0
  )
}

export const totalTasksPerSubject = (subject, allTasks) => {
  if (subject.name === 'All Subjects') return allTasks.length
  return allTasks.filter(t => t.subject.name === subject.name).length
}

export const totalResourcesPerSubject = (subject, allResources) => {
  if (subject.name === 'All Subjects') return allResources.length
  return allResources.filter(r => r.subject.name === subject.name).length
}

export const totalNotesPerSubject = (subject, allNotes) => {
  if (subject.name === 'All Subjects') return allNotes.length
  return allNotes.filter(n => n.subject.name === subject.name).length
}

export const totalPracticalsPerSubject = (subject, allPracticals) => {
  if (subject.name === 'All Subjects') return allPracticals.length
  return allPracticals.filter(p => p.subject.name === subject.name).length
}
