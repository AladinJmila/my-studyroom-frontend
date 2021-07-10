import httpService from '../services/httpService'
import { getCurrentUser } from '../services/authService'
import * as actions from './loops'

const apiEndPoint = '/loops'
let userid
const user = getCurrentUser()
if (user) userid = user._id

export const loadLoops = () => async dispatch => {
  try {
    dispatch(actions.REQUEST_LOOPS())

    const { data } = await httpService.get(apiEndPoint, { headers: { userid } })

    dispatch(actions.GET_LOOPS(data))
  } catch (error) {
    console.log(error)
    dispatch(actions.REQUEST_LOOPS_FAIL())
  }
}

export const createLoop = loop => async dispatch => {
  try {
    const { data } = await httpService.post(apiEndPoint, loop)

    dispatch(actions.CREATE_LOOP(data))
  } catch (error) {
    console.log(error)
  }
}

export const selectedLoop = loop => dispatch => {
  dispatch(actions.SELECT_LOOP(loop))
}

export const clearSelectedLoop = () => dispatch => {
  dispatch(actions.CLEAR_SELECTED_LOOP())
}

export const updateLoop = loop => async dispatch => {
  const body = { ...loop }
  delete body._id

  try {
    const { data } = await httpService.put(`${apiEndPoint}/${loop._id}`, body)

    dispatch(actions.UPDATE_LOOP(data))
  } catch (error) {
    console.log(error)
  }
}

export const patchLoop = (id, update) => async dispatch => {
  try {
    const { data } = await httpService.patch(`${apiEndPoint}/${id}`, update)

    dispatch(actions.UPDATE_LOOP(data))
  } catch (error) {
    console.log(error)
  }
}

export const toggleLoopProp = (id, property) => dispatch => {
  dispatch(actions.TOGGLE_LOOP_PROP({ id, property }))
}

export const deleteLoop = id => async dispatch => {
  try {
    await httpService.delete(`${apiEndPoint}/${id}`)

    dispatch(actions.DELETE_LOOP(id))
  } catch (error) {
    console.log(error)
  }
}
