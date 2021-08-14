import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'tasks',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
    selectedTask: null,
    subjectsPublic: {},
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

    GET_ONE_SUBJECT_PUBLIC_TASKS: (tasks, action) => {
      const { subjectId, data } = action.payload
      tasks.subjectsPublic[subjectId] = data
      tasks.loading = false
    },

    CREATE_TASK: (tasks, action) => {
      tasks.list.unshift(action.payload)
    },

    CLONE_TASK: (tasks, action) => {
      tasks.list = [...action.payload, ...tasks.list]
    },

    SELECT_TASK: (tasks, action) => {
      tasks.selectedTask = action.payload
    },

    CLEAR_SELECTED_TASK: (tasks, action) => {
      tasks.selectedTask = null
    },

    UPDATE_TASK: (tasks, action) => {
      const index = tasks.list.findIndex(t => t._id === action.payload._id)
      tasks.list[index] = action.payload
    },

    TOGGLE_TASK_PROP: (tasks, action) => {
      const { id, property } = action.payload
      const index = tasks.list.findIndex(task => task._id === id)
      tasks.list[index][property] = !tasks.list[index][property]
    },

    DELETE_TASK: (tasks, action) => {
      const index = tasks.list.findIndex(t => t._id === action.payload)
      tasks.list.splice(index, 1)
    },
  },
})

export const {
  REQUEST_TASKS,
  REQUEST_TASKS_FAIL,
  GET_TASKS,
  GET_ONE_SUBJECT_PUBLIC_TASKS,
  CREATE_TASK,
  CLONE_TASK,
  SELECT_TASK,
  CLEAR_SELECTED_TASK,
  UPDATE_TASK,
  TOGGLE_TASK_PROP,
  DELETE_TASK,
} = slice.actions
export default slice.reducer
