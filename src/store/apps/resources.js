import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'resources',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
    selectedResource: null,
  },
  reducers: {
    REQUEST_RESOURCES: (resources, action) => {
      resources.loading = true
    },

    REQUEST_RESOURCES_FAIL: (resources, action) => {
      resources.loading = false
    },

    GET_RESOURCES: (resources, action) => {
      resources.list = action.payload
      resources.loading = false
      resources.lastFetch = Date.now()
    },

    CREATE_RESOURCE: (resources, action) => {
      resources.list.unshift(action.payload)
    },

    SELECT_RESOURCE: (resources, action) => {
      resources.selectedResource = action.payload
    },

    CLEAR_SELECTED_RESOURCE: (resources, action) => {
      resources.selectedResource = null
    },

    UPDATE_RESOURCE: (resources, action) => {
      const index = resources.list.findIndex(r => r._id === action.payload._id)
      resources.list[index] = action.payload
    },

    TOGGLE_RESOURCE_PROP: (resources, action) => {
      const { id, property } = action.payload
      const index = resources.list.findIndex(resource => resource._id === id)
      resources.list[index][property] = !resources.list[index][property]
    },

    DELETE_RESOURCE: (resources, action) => {
      const index = resources.list.findIndex(r => r._id === action.payload)
      resources.list.splice(index, 1)
    },
  },
})

export const {
  REQUEST_RESOURCES,
  REQUEST_RESOURCES_FAIL,
  GET_RESOURCES,
  CREATE_RESOURCE,
  SELECT_RESOURCE,
  CLEAR_SELECTED_RESOURCE,
  UPDATE_RESOURCE,
  TOGGLE_RESOURCE_PROP,
  DELETE_RESOURCE,
  TOGGLE_RESOURCE_STATUS,
} = slice.actions
export default slice.reducer
