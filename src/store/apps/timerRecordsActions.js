import httpService from '../services/httpService'
import { getCurrentUser } from '../services/authService'
import * as actions from './timerRecords'

const apiEndPoint = '/timerRecords'
let userid
const user = getCurrentUser()
if (user) userid = user._id

export const loadNewestTimerRecord = () => async dispatch => {
  try {
    const { data } = await httpService.get(apiEndPoint)

    dispatch(actions.GET_NEWEST_TIMER_RECORD(data[0]))
  } catch (error) {
    console.log(error)
  }
}

export const loadDailyDurations = () => async dispatch => {
  try {
    const { data } = await httpService.get(`${apiEndPoint}/daily-durations`)

    dispatch(actions.GET_DAILY_DURATIONS(data))
  } catch (error) {
    console.log(error)
  }
}

export const updateTimerRecords = (record, timerRecordId) => async dispatch => {
  try {
    const { data } = await httpService.put(
      `${apiEndPoint}/${timerRecordId}`,
      record
    )

    dispatch(actions.UPDATE_TIMER_RECORDS(data))
  } catch (error) {
    console.log(error)
  }
}
