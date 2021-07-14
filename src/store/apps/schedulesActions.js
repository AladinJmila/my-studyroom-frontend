import httpService from '../services/httpService'
import { getCurrentUser } from '../services/authService'
import * as actions from './schedules'
import { SET_TOTAL_SCHEDULES } from '../ui/uiParams'

const apiEndPoint = '/schedules'
let userid
const user = getCurrentUser()
if (user) userid = user._id

export const loadSchedules = () => async dispatch => {
  try {
    dispatch(actions.REQUEST_SCHEDULES())

    const { data } = await httpService.get(apiEndPoint, { headers: { userid } })

    dispatch(actions.GET_SCHEDULES(data))
    dispatch(SET_TOTAL_SCHEDULES(data.length))
  } catch (error) {
    console.log(error)
    dispatch(actions.REQUEST_SCHEDULES_FAIL())
  }
}

export const createSchedule = schedule => async dispatch => {
  try {
    const { data } = await httpService.post(apiEndPoint, schedule)

    dispatch(actions.CREATE_SCHEDULE(data))
  } catch (error) {
    console.log(error)
  }
}

export const setSelectedSchedule = schedule => dispatch => {
  dispatch(actions.SELECT_SCHEDULE(schedule))
}

export const clearSelectedSchedule = () => dispatch => {
  dispatch(actions.CLEAR_SELECTED_SCHEDULE())
}

export const updateSchedule = schedule => async dispatch => {
  const body = { ...schedule }
  delete body._id

  try {
    const { data } = await httpService.put(
      `${apiEndPoint}/${schedule._id}`,
      body
    )

    dispatch(actions.UPDATE_SCHEDULE(data))
  } catch (error) {
    console.log()
  }
}

export const patchSchedule = (id, update) => async dispatch => {
  try {
    const { data } = await httpService.patch(`${apiEndPoint}/${id}`, update)

    dispatch(actions.UPDATE_SCHEDULE(data))
  } catch (error) {
    console.log(error)
  }
}

export const toggleScheduleProp = (id, property) => dispatch => {
  dispatch(actions.TOGGLE_SCHEDULE_PROP({ id, property }))
}

export const deleteSchedule = id => async dispatch => {
  try {
    await httpService.delete(`${apiEndPoint}/${id}`)

    dispatch(actions.DELETE_SCHEDULE(id))
  } catch (error) {
    console.log(error)
  }
}
