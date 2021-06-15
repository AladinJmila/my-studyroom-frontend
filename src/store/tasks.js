import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'tasks',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
    selectedTask: null,
  },
  reducers: {
    REQUEST_TASKS: (tasks, action) => {
      tasks.loading = true
    },

    REQUEST_TASKS_FAIL: (tasks, action) => {
      tasks.loading = false
    },

    GET_TASKS: (tasks, action) => {
      tasks.list = action.payload
      tasks.loading = false
      tasks.lastFetch = Date.now()
    },

    CREATE_TASK: (tasks, action) => {
      tasks.list.push(action.payload)
    },

    SELECT_TASK: (tasks, action) => {
      tasks.selectedTask = action.payload
    },

    UPDATE_TASK: (tasks, action) => {
      tasks.list.map(task =>
        task._id === action.payload._id ? action.payload : task
      )
    },

    CLEAR_SELECTED_TASK: (tasks, action) => {
      tasks.selectedTask = null
    },

    PATCH_TASK: (tasks, action) => {
      tasks.list.map(task =>
        task._id === action.payload._id ? action.payload : task
      )
    },

    TOGGLE_TASK_PROP: (tasks, action) => {
      const { id, property } = action.payload
      const index = tasks.list.findIndex(task => task._id === id)
      tasks.list[index][property] = !tasks.list[index][property]
    },

    DELETE_TASK: (tasks, action) => {
      tasks.list.filter(task => task._id !== action.payload)
    },
  },
})

export const {
  REQUEST_TASKS,
  REQUEST_TASKS_FAIL,
  GET_TASKS,
  CREATE_TASK,
  SELECT_TASK,
  UPDATE_TASK,
  CLEAR_SELECTED_TASK,
  PATCH_TASK,
  TOGGLE_TASK_PROP,
  DELETE_TASK,
} = slice.actions
export default slice.reducer
