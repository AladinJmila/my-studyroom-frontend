import moment from 'moment'
import httpService from '../services/httpService'
import { getCurrentUser } from '../services/authService'
import * as actions from './tasks'
import config from '../../config.json'

const loadingInterval = Number(config.loadingInternal)
const apiEndPoint = '/tasks'
let userid
const user = getCurrentUser()
if (user) userid = user._id

export const loadTasks = () => async (dispatch, getState) => {
  const { lastFetch } = getState().apps.tasks

  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes')
  if (diffInMinutes < loadingInterval) return

  try {
    dispatch(actions.REQUEST_TASKS())

    const { data } = await httpService.get(apiEndPoint, { headers: { userid } })

    dispatch(actions.GET_TASKS(data))
  } catch (error) {
    console.log(error)
    dispatch(actions.REQUEST_TASKS_FAIL())
  }
}

export const createTask = task => async dispatch => {
  try {
    const { data } = await httpService.post(apiEndPoint, task)

    dispatch(actions.CREATE_TASK(data))
  } catch (error) {
    console.log(error)
  }
}
export const setSelectedTask = task => dispatch => {
  dispatch(actions.SELECT_TASK(task))
}

export const updateTask = task => async dispatch => {
  const body = { ...task }
  delete body._id

  try {
    const { data } = await httpService.put(`${apiEndPoint}/${task._id}`, body)

    dispatch(actions.UPDATE_TASK(data))
  } catch (error) {
    console.log(error)
  }
}

export const clearSelectedTask = () => dispatch => {
  dispatch(actions.CLEAR_SELECTED_TASK())
}

export const patchTask = (id, update) => async dispatch => {
  try {
    const { data } = await httpService.patch(`${apiEndPoint}/${id}`, update)

    dispatch(actions.UPDATE_TASK(data))
  } catch (error) {
    console.log(error)
  }
}

export const toggleTaskProp = (id, property) => async dispatch => {
  dispatch(actions.TOGGLE_TASK_PROP({ id, property }))
}

export const deleteTask = id => async dispatch => {
  try {
    await httpService.delete(`${apiEndPoint}/${id}`)

    dispatch(actions.DELETE_TASK(id))
  } catch (error) {
    console.log(error)
  }
}
