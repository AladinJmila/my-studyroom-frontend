import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'notes',
  initialState: {
    list: [],
    filtered: [],
    loading: false,
    lastFetch: null,
    selectedNote: null,
  },
  reducers: {
    REQUEST_NOTES: (notes, action) => {
      notes.loading = true
    },

    REQUEST_NOTES_FAIL: (notes, action) => {
      notes.loading = false
    },

    GET_NOTES: (notes, action) => {
      notes.list = action.payload
      notes.loading = false
      notes.lastFetch = Date.now()
    },

    CREATE_NOTE: (notes, action) => {
      notes.list.unshift(action.payload)
    },

    SELECT_NOTE: (notes, action) => {
      notes.selectedNote = action.payload
    },

    CLEAR_SELECTED_NOTE: (notes, action) => {
      notes.selectedNote = null
    },

    UPDATE_NOTE: (notes, action) => {
      const index = notes.list.findIndex(n => n._id === action.payload._id)
      notes.list[index] = action.payload
    },

    TOGGLE_NOTE_PROP: (notes, action) => {
      const { id, property } = action.payload
      const index = notes.list.findIndex(note => note._id === id)
      notes.list[index][property] = !notes.list[index][property]
    },

    DELETE_NOTE: (notes, action) => {
      const index = notes.list.findIndex(n => n._id === action.payload)
      notes.list.splice(index, 1)
    },

    FILTER_NOTES: (notes, action) => {
      notes.filtered = action.payload
    },
  },
})

export const {
  REQUEST_NOTES,
  REQUEST_NOTES_FAIL,
  GET_NOTES,
  CREATE_NOTE,
  SELECT_NOTE,
  CLEAR_SELECTED_NOTE,
  UPDATE_NOTE,
  TOGGLE_NOTE_PROP,
  DELETE_NOTE,
  FILTER_NOTES,
} = slice.actions
export default slice.reducer
