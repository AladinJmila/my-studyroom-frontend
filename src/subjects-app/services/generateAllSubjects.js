const generateAllSubjects = subjects => {
  return {
    key: 'key',
    name: 'All Subjects',
    creatorId: subjects[0]?.creatorId,
    numberOfTasks: subjects.reduce(
      (t, { numberOfTasks }) => t + numberOfTasks,
      0
    ),
    numberOfCheckedTasks: subjects.reduce(
      (t, { numberOfCheckedTasks }) => t + numberOfCheckedTasks,
      0
    ),
    numberOfResources: subjects.reduce(
      (t, { numberOfResources }) => t + numberOfResources,
      0
    ),
    numberOfCheckedResources: subjects.reduce(
      (t, { numberOfCheckedResources }) => t + numberOfCheckedResources,
      0
    ),
    numberOfNotes: subjects.reduce(
      (t, { numberOfNotes }) => t + numberOfNotes,
      0
    ),
    numberOfCheckedNotes: subjects.reduce(
      (t, { numberOfCheckedNotes }) => t + numberOfCheckedNotes,
      0
    ),
    numberOfPracticals: subjects.reduce(
      (t, { numberOfPracticals }) => t + numberOfPracticals,
      0
    ),
    numberOfCheckedPracticals: subjects.reduce(
      (t, { numberOfCheckedPracticals }) => t + numberOfCheckedPracticals,
      0
    ),
    numberOfAudioNotes: subjects.reduce(
      (t, { numberOfAudioNotes }) => t + numberOfAudioNotes,
      0
    ),
    numberOfCheckedAudioNotes: subjects.reduce(
      (t, { numberOfCheckedAudioNotes }) => t + numberOfCheckedAudioNotes,
      0
    ),
    numberOfVisualNotes: subjects.reduce(
      (t, { numberOfVisualNotes }) => t + numberOfVisualNotes,
      0
    ),
    numberOfCheckedVisualNotes: subjects.reduce(
      (t, { numberOfCheckedVisualNotes }) => t + numberOfCheckedVisualNotes,
      0
    ),
  }
}

export default generateAllSubjects
