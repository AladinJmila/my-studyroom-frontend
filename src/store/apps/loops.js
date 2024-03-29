import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'loops',
  initialState: {
    list: [],
    loading: false,
    selectedLoop: null,
    playingLoop: null,
  },
  reducers: {
    REQUEST_LOOPS: (loops, action) => {
      loops.loading = true
    },

    REQUEST_LOOPS_FAIL: (loops, action) => {
      loops.loading = false
    },

    GET_LOOPS: (loops, action) => {
      loops.list = action.payload
      loops.loading = false
    },

    UPDATE_LOOPS: (loops, action) => {
      action.payload.forEach(loop => {
        const index = loops.list.findIndex(l => l._id === loop._id)
        loops.list[index] = loop
      })
    },

    CREATE_LOOP: (loops, action) => {
      loops.list.unshift(action.payload)
    },

    SELECT_LOOP: (loops, action) => {
      loops.selectedLoop = action.payload
    },

    CLEAR_SELECTED_LOOP: (loops, action) => {
      loops.selectedLoop = null
    },

    SET_PLAYING_LOOP: (loops, action) => {
      loops.playingLoop = action.payload
    },

    CLEAR_PLAYING_LOOP: (loops, action) => {
      loops.playingLoop = null
    },

    UPDATE_LOOP: (loops, action) => {
      const index = loops.list.findIndex(l => l._id === action.payload._id)
      loops.list[index] = action.payload
    },

    TOGGLE_LOOP_PROP: (loops, action) => {
      const { id, property } = action.payload
      const index = loops.list.findIndex(l => l._id === id)
      loops.list[index][property] = !loops.list[index][property]
    },

    DELETE_LOOP: (loops, action) => {
      const index = loops.list.findIndex(l => l._id === action.payload)
      loops.list.splice(index, 1)
    },

    ADD_TOTAL_DURATION: (loops, action) => {
      const { id, totalDuration } = action.payload
      const index = loops.list.findIndex(l => l._id === id)
      loops.list[index].totalDuration = totalDuration
    },
  },
})

export const {
  REQUEST_LOOPS,
  REQUEST_LOOPS_FAIL,
  GET_LOOPS,
  UPDATE_LOOPS,
  CREATE_LOOP,
  SELECT_LOOP,
  CLEAR_SELECTED_LOOP,
  SET_PLAYING_LOOP,
  CLEAR_PLAYING_LOOP,
  UPDATE_LOOP,
  TOGGLE_LOOP_PROP,
  DELETE_LOOP,
  ADD_TOTAL_DURATION,
} = slice.actions
export default slice.reducer
