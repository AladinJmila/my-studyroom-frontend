import { createSlice } from '@reduxjs/toolkit'
import { getCurrentUser } from '../services/authService'

const slice = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {
    SET_USER: (store, action) => {
      store.user = action.payload
    },
  },
})

export const { SET_USER } = slice.actions
export default slice.reducer

// Action Creators
export const setCurrentUser = () => dispatch => {
  const user = getCurrentUser()
  dispatch(SET_USER(user))
}

setCurrentUser()
