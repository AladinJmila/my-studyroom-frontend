import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'timer',
  initialState: {
    list: [],
    loading: false,
    selectedInterval: null,
  },
  reducers: {
    REQUEST_INTERVALS: (intervals, action) => {
      intervals.loading = true
    },
    REQUEST_INTERVALS_FAIL: (intervals, action) => {
      intervals.loading = false
    },
    GET_INTERVALS: (intervals, action) => {
      intervals.list = action.payload
      intervals.loading = false
    },
    CREATE_INTERVAL: (intervals, action) => {
      intervals.list.unshift(action.payload)
    },

    SELECT_INTERVAL: (intervals, action) => {
      intervals.selectedInterval = action.payload
    },

    CLEAR_SELECTED_INTERVAL: (intervals, action) => {
      intervals.selectedInterval = null
    },

    UPDATE_INTERVAL: (intervals, action) => {
      const index = intervals.list.findIndex(i => i._id === action.payload._id)
      intervals.list[index] = action.payload
    },

    TOGGLE_INTERVAL_PROP: (intervals, action) => {
      const { id, property } = action.payload
      const index = intervals.list.findIndex(i => i._id === id)
      intervals.list[index][property] = !intervals.list[index][property]
    },

    DELETE_INTERVAL: (intervals, action) => {
      const index = intervals.list.findIndex(i => i._id === action.payload)
      intervals.list.splice(index, 1)
    },
  },
})

export const {
  REQUEST_INTERVALS,
  REQUEST_INTERVALS_FAIL,
  GET_INTERVALS,
  CREATE_INTERVAL,
  SELECT_INTERVAL,
  CLEAR_SELECTED_INTERVAL,
  UPDATE_INTERVAL,
  TOGGLE_INTERVAL_PROP,
  DELETE_INTERVAL,
} = slice.actions
export default slice.reducer
