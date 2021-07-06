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

    UPDATE_SUBJECT_ON_EDIT: (subjects, action) => {
      const { itemInDb, item, itemName } = action.payload
      if (itemInDb.subject._id !== item.subjectId) {
        let index = subjects.list.findIndex(s => s._id === itemInDb.subject._id)
        const prevSubject = subjects.list[index]
        index = subjects.list.findIndex(s => s._id === item.subjectId)
        const newSubject = subjects.list[index]
        if (itemInDb.isChecked) {
          prevSubject[`numberOfChecked${itemName}`]--
          newSubject[`numberOfChecked${itemName}`]++
        }

        prevSubject[`numberOf${itemName}`]--
        newSubject[`numberOf${itemName}`]++
      }
    },

    UPDATE_SUBJECT_CHECKED_ITEMS_COUNT: (subjects, action) => {
      const { subjectId, itemName, value } = action.payload
      const index = subjects.list.findIndex(s => s._id === subjectId)
      value.isChecked
        ? subjects.list[index][`numberOfChecked${itemName}`]++
        : subjects.list[index][`numberOfChecked${itemName}`]--
    },

    UPDATE_SUBJECT_ITEMS_COUNT: (subjects, action) => {
      const { item, itemName, operation } = action.payload
      const index = subjects.list.findIndex(
        s => s._id === item?.subject?._id || item.subjectId
      )
      if (operation === 'create') {
        subjects.list[index][`numberOf${itemName}`]++
      } else if (operation === 'delete') {
        if (item.isChecked) subjects.list[index][`numberOfChecked${itemName}`]--
        subjects.list[index][`numberOf${itemName}`]--
      }
    },

    TOGGLE_SUBJECT_PROP: (subjects, action) => {
      const { id, property } = action.payload
      const index = subjects.list.findIndex(s => s._id === id)
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
  UPDATE_SUBJECT_ON_EDIT,
  UPDATE_SUBJECT_CHECKED_ITEMS_COUNT,
  UPDATE_SUBJECT_ITEMS_COUNT,
  TOGGLE_SUBJECT_PROP,
  DELETE_SUBJECT,
} = slice.actions
export default slice.reducer
