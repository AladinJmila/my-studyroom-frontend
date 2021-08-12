import httpService from '../services/httpService'
import { getCurrentUser } from '../services/authService'
import * as actions from './sessions'
import { SET_TOTAL_SESSIONS } from '../ui/uiParams'

const apiEndPoint = '/sessions'
let userid
const user = getCurrentUser()
if (user) userid = user._id

export const loadSessions = () => async dispatch => {
  try {
    dispatch(actions.REQUEST_SESSIONS())

    const { data } = await httpService.get(apiEndPoint, { headers: { userid } })

    dispatch(actions.GET_SESSIONS(data))
    dispatch(SET_TOTAL_SESSIONS(data.length))
  } catch (error) {
    console.log(error)
    dispatch(actions.REQUEST_SESSIONS_FAIL())
  }
}

export const createSession = session => async dispatch => {
  try {
    const { data } = await httpService.post(apiEndPoint, session)

    dispatch(actions.CREATE_SESSION(data))
  } catch (error) {
    console.log(error)
  }
}

export const setSelectedSession = session => dispatch => {
  dispatch(actions.SELECT_SESSION(session))
}

export const clearSelectedSession = () => dispatch => {
  dispatch(actions.CLEAR_SELECTED_SESSION())
}

export const setPlayingSession = session => dispatch => {
  dispatch(actions.SET_PLAYING_SESSION(session))
}

export const clearPlayingSession = () => dispatch => {
  dispatch(actions.CLEAR_PLAYING_SESSION())
}

export const updateSession = session => async dispatch => {
  const body = { ...session }
  delete body._id

  try {
    const { data } = await httpService.put(
      `${apiEndPoint}/${session._id}`,
      body
    )

    dispatch(actions.UPDATE_SESSION(data))
  } catch (error) {
    console.log(error)
  }
}

export const patchSession = (id, update) => async dispatch => {
  try {
    const { data } = await httpService.patch(`${apiEndPoint}/${id}`, update)

    dispatch(actions.UPDATE_SESSION(data))
  } catch (error) {
    console.log(error)
  }
}

export const toggleSessionProp = (id, property) => dispatch => {
  dispatch(actions.TOGGLE_SESSION_PROP({ id, property }))
}

export const deleteSession = id => async dispatch => {
  try {
    await httpService.delete(`${apiEndPoint}/${id}`)

    dispatch(actions.DELETE_SESSION(id))
  } catch (error) {
    console.log(error)
  }
}
