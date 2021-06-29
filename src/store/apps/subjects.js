import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'subjects',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
    selectedSubject: null,
  },
  reducers: {
    REQUEST_SUBJECTS: (subjects, action) => {
      subjects.loading = true
    },

    REQUEST_SUBJECTS_FAIL: (subjects, action) => {
      subjects.loading = false
    },

    GET_SUBJECTS: (subjects, action) => {
      subjects.list = action.payload
      subjects.loading = false
      subjects.lastFetch = Date.now()
    },

    CREATE_SUBJECT: (subjects, action) => {
      subjects.list.push(action.payload)
    },

    SELECT_SUBJECT: (uiParams, action) => {
      uiParams.selectedSubject = action.payload
    },

    UPDATE_SUBJECT: (subjects, action) => {
      const index = subjects.list.findIndex(s => s._id === action.payload._id)
      subjects.list[index] = action.payload
    },

    TOGGLE_SUBJECT_PROP: (subjects, action) => {
      const { id, property } = action.payload
      const index = subjects.list.findIndex(subject => subject._id === id)
      subjects.list[index][property] = !subjects.list[index][property]
    },

    DELETE_SUBJECT: (subjects, action) => {
      const index = subjects.list.findIndex(s => s._id === action.payload)
      subjects.list.splice(index, 1)
    },
  },
})

export const {
  REQUEST_SUBJECTS,
  REQUEST_SUBJECTS_FAIL,
  GET_SUBJECTS,
  CREATE_SUBJECT,
  SELECT_SUBJECT,
  UPDATE_SUBJECT,
  TOGGLE_SUBJECT_PROP,
  DELETE_SUBJECT,
} = slice.actions
export default slice.reducer
