import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'schedule',
  initialState: {
    list: [],
    loading: false,
    selectedSchedule: null,
  },
  reducers: {
    REQUEST_SCHEDULES: (schedules, action) => {
      schedules.loading = true
    },

    REQUEST_SCHEDULES_FAIL: (schedules, action) => {
      schedules.loading = false
    },

    GET_SCHEDULES: (schedules, action) => {
      schedules.list = action.payload
      schedules.loading = false
    },

    CREATE_SCHEDULE: (schedules, action) => {
      schedules.list.unshift(action.payload)
    },

    SELECT_SCHEDULE: (schedules, action) => {
      schedules.selectedSchedule = action.payload
    },

    CLEAR_SELECTED_SCHEDULE: (schedules, action) => {
      schedules.selectedSchedule = null
    },

    UPDATE_SCHEDULE: (schedules, action) => {
      const index = schedules.list.findIndex(s => s._id === action.payload._id)
      schedules.list[index] = action.payload
    },

    TOGGLE_SCHEDULE_PROP: (schedules, action) => {
      const { id, property } = action.payload
      const index = schedules.list.findIndex(s => s._id === id)
      schedules.list[index][property] = !schedules.list[index][property]
    },

    DELETE_SCHEDULE: (schedules, action) => {
      const index = schedules.list.findIndex(s => s._id === action.payload)
      schedules.list.splice(index, 1)
    },
  },
})

export const {
  REQUEST_SCHEDULES,
  REQUEST_SCHEDULES_FAIL,
  GET_SCHEDULES,
  CREATE_SCHEDULE,
  SELECT_SCHEDULE,
  CLEAR_SELECTED_SCHEDULE,
  UPDATE_SCHEDULE,
  TOGGLE_SCHEDULE_PROP,
  DELETE_SCHEDULE,
} = slice.actions
export default slice.reducer
