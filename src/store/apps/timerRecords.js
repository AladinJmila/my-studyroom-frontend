import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'timerRecord',
  initialState: {
    newestTimerRecord: null,
    newestAction: null,
    dailyDurations: [],
    vizData: [],
    selectedDayViz: null,
  },
  reducers: {
    GET_NEWEST_TIMER_RECORD: (timerRecords, action) => {
      timerRecords.newestTimerRecord = action.payload;
    },

    GET_DAILY_DURATIONS: (timerRecords, action) => {
      timerRecords.dailyDurations = action.payload;
    },

    GET_VIZ_DATA: (timerRecords, action) => {
      timerRecords.vizData = action.payload;
    },

    UPDATE_TIMER_RECORDS: (timerRecords, action) => {
      timerRecords.newestTimerRecord = action.payload;
    },

    UPDATE_ACTION: (timerRecords, action) => {
      timerRecords.newestAction = action.payload;
    },

    SET_SELECTED_DAY_VIZ: (timerRecords, action) => {
      timerRecords.selectedDayViz = action.payload;
    },
  },
});

export const {
  GET_NEWEST_TIMER_RECORD,
  GET_DAILY_DURATIONS,
  GET_VIZ_DATA,
  UPDATE_TIMER_RECORDS,
  UPDATE_ACTION,
  SET_SELECTED_DAY_VIZ,
} = slice.actions;
export default slice.reducer;
