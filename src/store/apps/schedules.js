import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'schedule',
  initialState: {
    list: [],
    loading: false,
    selectedSchedule: null,
  },
  reducers: {},
})

export const {} = slice.actions
export default slice.reducer
