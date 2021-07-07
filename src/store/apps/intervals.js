import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'timer',
  initialState: {
    list: [],
    loading: false,
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
    UPDATE_INTERVAL: (intervals, action) => {
      const index = intervals.list.findIndex(i => i._id === action.payload._id)
      intervals.list[index] = action.payload
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
  UPDATE_INTERVAL,
  DELETE_INTERVAL,
} = slice.actions
export default slice.reducer
