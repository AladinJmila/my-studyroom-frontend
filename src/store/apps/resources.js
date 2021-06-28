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
      resources.list.map(resource =>
        resource._id === action.payload._id ? action.payload : resource
      )
    },

    TOGGLE_RESOURCE_PROP: (resources, action) => {
      const { id, property } = action.payload
      const index = resources.list.findIndex(resource => resource._id === id)
      resources.list[index][property] = !resources.list[index][property]
    },

    DELETE_RESOURCE: (resources, action) => {
      resources.list.filter(resource => resource._id !== action.payload)
    },
  },
})

export const {
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
