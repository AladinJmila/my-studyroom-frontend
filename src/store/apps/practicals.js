import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'practicals',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
    selectedPractical: null,
  },
  reducers: {
    REQUEST_PRACTICALS: (practicals, action) => {
      practicals.loading = true
    },

    REQUEST_PRACTICALS_FAIL: (practicals, action) => {
      practicals.loading = false
    },

    GET_PRACTICALS: (practicals, action) => {
      practicals.list = action.payload
      practicals.loading = false
      practicals.lastFetch = Date.now()
    },

    CREATE_PRACTICAL: (practicals, action) => {
      practicals.list.unshift(action.payload)
    },

    SELECT_PRACTICAL: (practicals, action) => {
      practicals.selectedPractical = action.payload
    },

    CLEAR_SELECTED_PRACTICAL: (practicals, action) => {
      practicals.selectedPractical = null
    },

    UPDATE_PRACTICAL: (practicals, action) => {
      const index = practicals.list.findIndex(p => p._id === action.payload._id)
      practicals.list[index] = action.payload
    },

    TOGGLE_PRACTICAL_PROP: (practicals, action) => {
      const { id, property } = action.payload
      const index = practicals.list.findIndex(p => p._id === id)
      practicals.list[index][property] = !practicals.list[index][property]
    },

    DELETE_PRACTICAL: (practicals, action) => {
      const index = practicals.list.findIndex(p => p._id === action.payload)
      practicals.list.splice(index, 1)
    },
  },
})

export const {
  REQUEST_PRACTICALS,
  REQUEST_PRACTICALS_FAIL,
  GET_PRACTICALS,
  CREATE_PRACTICAL,
  SELECT_PRACTICAL,
  CLEAR_SELECTED_PRACTICAL,
  UPDATE_PRACTICAL,
  TOGGLE_PRACTICAL_PROP,
  DELETE_PRACTICAL,
} = slice.actions
export default slice.reducer
