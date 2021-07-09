import httpService from '../services/httpService'
import { getCurrentUser } from '../services/authService'
import * as actions from './intervals'

const apiEndPoint = '/intervals'
let userid
const user = getCurrentUser()

if (user) userid = user._id

export const loadIntervals = () => async dispatch => {
  try {
    dispatch(actions.REQUEST_INTERVALS())

    const { data } = await httpService.get(apiEndPoint, { headers: { userid } })

    dispatch(actions.GET_INTERVALS(data))
  } catch (error) {
    console.log(error)
    dispatch(actions.REQUEST_INTERVALS_FAIL())
  }
}

export const createInterval = interval => async dispatch => {
  try {
    const { data } = await httpService.post(apiEndPoint, interval)

    dispatch(actions.CREATE_INTERVAL(data))
  } catch (error) {
    console.log(error)
  }
}

export const setSelectedInterval = interval => dispatch => {
  dispatch(actions.SELECT_INTERVAL(interval))
}

export const clearSelectedInterval = () => dispatch => {
  dispatch(actions.CLEAR_SELECTED_INTERVAL())
}

export const updateInterval = interval => async dispatch => {
  const body = { ...interval }
  delete body._id

  try {
    const { data } = await httpService.put(
      `${apiEndPoint}/${interval._id}`,
      body
    )

    dispatch(actions.UPDATE_INTERVAL(data))
  } catch (error) {
    console.log(error)
  }
}

export const patchInterval = (id, update) => async dispatch => {
  try {
    const { data } = await httpService.patch(`${apiEndPoint}/${id}`, update)

    dispatch(actions.UPDATE_INTERVAL(data))
  } catch (error) {
    console.log(error)
  }
}

export const toggleIntervalProp = (id, property) => dispatch => {
  dispatch(actions.TOGGLE_INTERVAL_PROP({ id, property }))
}

export const deleteInterval = id => async dispatch => {
  try {
    await httpService.delete(`${apiEndPoint}/${id}`)

    dispatch(actions.DELETE_INTERVAL(id))
  } catch (error) {
    console.log(error)
  }
}
