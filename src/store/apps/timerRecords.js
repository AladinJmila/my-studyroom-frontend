import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'timerRecord',
  initialState: {
    newestTimerRecord: null,
  },
  reducers: {
    GET_NEWEST_TIMER_RECORD: (timerRecords, action) => {
      timerRecords.newestTimerRecord = action.payload
    },

    UPDATE_TIMER_RECORDS: (timerRecords, action) => {
      timerRecords.newestTimerRecord = action.payload
    },
  },
})

export const { GET_NEWEST_TIMER_RECORD, UPDATE_TIMER_RECORDS } = slice.actions
export default slice.reducer
