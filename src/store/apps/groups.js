import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'groups',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
    selectedGroup: null,
  },
  reducers: {
    REQUEST_GROUPS: (groups, action) => {
      groups.loading = true
    },

    REQUEST_GROUPS_FAIL: (groups, action) => {
      groups.loading = false
    },

    GET_GROUPS: (groups, action) => {
      groups.list = action.payload
      groups.loading = false
      groups.lastFetch = Date.now()
    },

    GET_GROUP: (groups, action) => {
      groups.selectedGroup = action.payload
      groups.loading = false
    },

    CREATE_GROUP: (groups, action) => {
      groups.list.unshift(action.payload)
    },

    SELECT_GROUP: (groups, action) => {
      groups.selectedGroup = action.payload
    },

    CLEAR_SELECTED_GROUP: (groups, action) => {
      groups.selectedGroup = null
    },

    UPDATE_GROUP: (groups, action) => {
      const index = groups.list.findIndex(g => g._id === action.payload._id)
      groups.list[index] = action.payload
    },
  },
})

export const {
  REQUEST_GROUPS,
  REQUEST_GROUPS_FAIL,
  GET_GROUPS,
  GET_GROUP,
  CREATE_GROUP,
  SELECT_GROUP,
  CLEAR_SELECTED_GROUP,
  UPDATE_GROUP,
} = slice.actions
export default slice.reducer
