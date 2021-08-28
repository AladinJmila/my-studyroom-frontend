import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'session',
  initialState: {
    list: [],
    loading: false,
    selectedSession: null,
    playingSession: null,
    playing: false,
  },
  reducers: {
    REQUEST_SESSIONS: (sessions, action) => {
      sessions.loading = true
    },

    REQUEST_SESSIONS_FAIL: (sessions, action) => {
      sessions.loading = false
    },

    GET_SESSIONS: (sessions, action) => {
      sessions.list = action.payload
      sessions.loading = false
    },

    CREATE_SESSION: (sessions, action) => {
      sessions.list.unshift(action.payload)
    },

    SELECT_SESSION: (sessions, action) => {
      sessions.selectedSession = action.payload
    },

    CLEAR_SELECTED_SESSION: (sessions, action) => {
      sessions.selectedSession = null
    },

    SET_PLAYING_SESSION: (sessions, action) => {
      sessions.playingSession = action.payload
      sessions.playing = true
    },

    CLEAR_PLAYING_SESSION: (sessions, action) => {
      sessions.playingSession = null
      sessions.playing = false
    },

    UPDATE_SESSION: (sessions, action) => {
      const index = sessions.list.findIndex(s => s._id === action.payload._id)
      sessions.list[index] = action.payload
    },

    TOGGLE_SESSION_PROP: (sessions, action) => {
      const { id, property } = action.payload
      const index = sessions.list.findIndex(s => s._id === id)
      sessions.list[index][property] = !sessions.list[index][property]
    },

    DELETE_SESSION: (sessions, action) => {
      const index = sessions.list.findIndex(s => s._id === action.payload)
      sessions.list.splice(index, 1)
    },
  },
})

export const {
  REQUEST_SESSIONS,
  REQUEST_SESSIONS_FAIL,
  GET_SESSIONS,
  CREATE_SESSION,
  SELECT_SESSION,
  CLEAR_SELECTED_SESSION,
  SET_PLAYING_SESSION,
  CLEAR_PLAYING_SESSION,
  UPDATE_SESSION,
  TOGGLE_SESSION_PROP,
  DELETE_SESSION,
} = slice.actions
export default slice.reducer
