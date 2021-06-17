import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'authParams',
  initialState: {
    users: [],
    user: null,
  },
  reducers: {
    CREATE_USER: (users, action) => {},

    SET_USER: (store, action) => {
      store.user = action.payload
    },
  },
})

export const { SET_USER } = slice.actions
export default slice.reducer

// Action Creators
export const setCurrentUser = user => dispatch => {
  dispatch(SET_USER(user))
}

setCurrentUser()
