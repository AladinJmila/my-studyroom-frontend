import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'uiParams',
  initialState: {
    selectedSubject: null,
  },
  reducers: {
    SELECT_SUBJECT: (uiParams, action) => {
      uiParams.selectedSubject = action.payload
    },
  },
})

export const { SELECT_SUBJECT } = slice.actions
export default slice.reducer

// Action creators

export const setSelectedSubject = subject => dispatch => {
  dispatch(SELECT_SUBJECT(subject))
}
