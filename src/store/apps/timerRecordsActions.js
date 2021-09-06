import httpService from '../services/httpService'
import { getCurrentUser } from '../services/authService'
import * as actions from './timerRecords'

const apiEndPoint = '/timerRecords'
let userid
const user = getCurrentUser()
if (user) userid = user._id

export const recordTimer = record => async dispatch => {
  try {
    const { data } = await attpService.post(apiEndpoint, record)
  } catch (error) {
    console.log(error)
  }
}
