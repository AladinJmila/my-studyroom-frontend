import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'timerRecords',
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

export const { LOAD_NEWEST_TIMER_RECORD, UPDATE_TIMER_RECORDS } = slice.actions
export default slice.reducer
