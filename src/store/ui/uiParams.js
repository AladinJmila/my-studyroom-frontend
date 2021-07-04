import { createSlice } from '@reduxjs/toolkit'

let subject = 'All Subjects'

const slice = createSlice({
  name: 'uiParams',
  initialState: {
    tasksPerSubject: {},
    notesPerSubject: {},
    resourcesPerSubject: {},
    practicalsPerSubject: {},
    navigationRefs: {},
  },
  reducers: {
    TASKS_PER_SUBJECT: (state, action) => {
      const { subjectName, num } = action.payload
      state.tasksPerSubject[subjectName] = num
    },

    NOTES_PER_SUBJECT: (state, action) => {
      const { subjectName, num } = action.payload
      state.notesPerSubject[subjectName] = num
    },

    RESOURCES_PER_SUBJECT: (state, action) => {
      const { subjectName, num } = action.payload
      state.resourcesPerSubject[subjectName] = num
    },

    PRACTICALS_PER_SUBJECT: (state, action) => {
      const { subjectName, num } = action.payload
      state.practicalsPerSubject[subjectName] = num
    },

    NAVIGATION_REFS: (state, action) => {
      const { refName, refValue } = action.payload
      // console.log(refValue)
      state.navigationRefs[refName] = refValue
    },
  },
})

export const {
  TASKS_PER_SUBJECT,
  NOTES_PER_SUBJECT,
  RESOURCES_PER_SUBJECT,
  PRACTICALS_PER_SUBJECT,
  NAVIGATION_REFS,
} = slice.actions
export default slice.reducer

// Action creators

export const setTasksPerSubject = (subjectName, num) => dispatch => {
  dispatch(TASKS_PER_SUBJECT({ subjectName, num }))
}

export const setNotesPerSubject = (subjectName, num) => dispatch => {
  dispatch(NOTES_PER_SUBJECT({ subjectName, num }))
}

export const setResourcesPerSubject = (subjectName, num) => dispatch => {
  dispatch(RESOURCES_PER_SUBJECT({ subjectName, num }))
}

export const setPracticalsPerSubject = (subjectName, num) => dispatch => {
  dispatch(PRACTICALS_PER_SUBJECT({ subjectName, num }))
}
