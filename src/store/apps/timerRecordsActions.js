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

    dispatch(actions.LOAD_NEWEST_TIMER_RECORD(data))
  } catch (error) {
    console.log(error)
  }
}

export const updateTimerRecords = (record, timerRecord) => async dispatch => {
  try {
    const { data } = await attpService.put(
      `${apiEndpoint}/${timerRecord._id}`,
      record
    )

    dispatch(actions.UPDATE_TIMER_RECORDS(data))
  } catch (error) {
    console.log(error)
  }
}
