import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'timerRecords',
  initialState: {
    list: [],
  },
  reducers: {
    UPDATE_TIMER_RECORDS: (timerRecords, actions) => {
      timerRecords.list.unshift(action.payload)
    },
  },
})

export const { UPDATE_TIMER_RECORDS } = slice.actions
export default slice.reducer
