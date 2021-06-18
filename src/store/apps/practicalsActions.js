import moment from 'moment'
import httpService from '../services/httpService'
import { getCurrentUser } from '../services/authService'
import * as actions from './practicals'

const apiEndPoint = '/practicals'
let userid
const user = getCurrentUser()
if (user) userid = user._id

export const loadPracticals = () => async dispatch => {
  try {
    const { data } = await httpService.get(apiEndPoint, { headers: { userid } })

    dispatch(actions.GET_PRACTICALS(data))
  } catch (error) {
    console.log(error)
  }
}

export const createPractical = practical => async dispatch => {
  try {
    const { data } = await httpService.post(apiEndPoint, practical)

    dispatch(actions.CREATE_PRACTICAL(data))
    dispatch(loadPracticals())
  } catch (error) {
    console.log(error)
  }
}

export const setSelectedPractical = practical => dispatch => {
  dispatch(actions.SELECT_PRACTICAL(practical))
}

export const updatePractical = practical => async dispatch => {
  const body = { ...practical }
  delete body._id

  try {
    const { data } = httpService.put(`${apiEndPoint}/${practical._id}`, body)

    dispatch(actions.UPDATE_PRACTICAL(data))
    dispatch(loadPracticals())
  } catch (error) {
    console.log(error)
  }
}

export const clearSelectedPractical = () => dispatch => {
  dispatch(actions.CLEAR_SELECTED_PRACTICAL())
}

export const patchPractical = (id, update) => async dispatch => {
  try {
    const { data } = await httpService.patch(`${apiEndPoint}/${id}`, update)

    dispatch(actions.UPDATE_PRACTICAL(data))
    dispatch(loadPracticals())
  } catch (error) {
    console.log(error)
  }
}

export const togglePracticalProp = (id, property) => dispatch => {
  dispatch(actions.TOGGLE_PRACTICAL_PROP({ id, property }))
}

export const deletePractical = id => async dispatch => {
  try {
    await httpService.delete(`${apiEndPoint}/${id}`)

    dispatch(actions.DELETE_PRACTICAL(id))
    dispatch(loadPracticals())
  } catch (error) {
    console.log(error)
  }
}
