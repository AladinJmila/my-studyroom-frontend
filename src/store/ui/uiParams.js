import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'uiParams',
  initialState: {
    selectedSubject: null,
  },
  reducers: {},
})

export const { SELECT_SUBJECT } = slice.actions
export default slice.reducer

// Action creators
