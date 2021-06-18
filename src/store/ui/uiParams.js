import { createSlice } from '@reduxjs/toolkit'

let subject = 'All Subjects'

const slice = createSlice({
  name: 'uiParams',
  initialState: {
    tasksPerSubject: {},
    notesPerSubject: {},
    resourcesPerSubject: {},
    practicalsPerSubject: {},
  },
  reducers: {
    TASKS_PER_SUBJECT: (state, action) => {
      const { subjectName, list } = action.payload
      state.tasksPerSubject[subjectName] = list
    },

    NOTES_PER_SUBJECT: (state, action) => {
      const { subjectName, list } = action.payload
      state.notesPerSubject[subjectName] = list
    },

    RESOURCES_PER_SUBJECT: (state, action) => {
      const { subjectName, list } = action.payload
      state.resourcesPerSubject[subjectName] = list
    },

    PRACTICALS_PER_SUBJECT: (state, action) => {
      const { subjectName, list } = action.payload
      state.practicalsPerSubject[subjectName] = list
    },
  },
})

export const {
  TASKS_PER_SUBJECT,
  NOTES_PER_SUBJECT,
  RESOURCES_PER_SUBJECT,
  PRACTICALS_PER_SUBJECT,
} = slice.actions
export default slice.reducer

// Action creators

export const setTasksPerSubject = (subjectName, list) => dispatch => {
  dispatch(TASKS_PER_SUBJECT({ subjectName, list }))
}

export const setNotesPerSubject = (subjectName, list) => dispatch => {
  dispatch(NOTES_PER_SUBJECT({ subjectName, list }))
}

export const setResourcesPerSubject = (subjectName, list) => dispatch => {
  dispatch(RESOURCES_PER_SUBJECT({ subjectName, list }))
}

export const setPracticalsPerSubject = (subjectName, list) => dispatch => {
  dispatch(PRACTICALS_PER_SUBJECT({ subjectName, list }))
}
