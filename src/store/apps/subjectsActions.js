import moment from 'moment'
import httpService from '../services/httpService'
import { getCurrentUser } from '../../services/authService'
import * as actions from './subjects'
import config from '../../config.json'

const apiEndPoint = '/subjects'
let userid
const user = getCurrentUser()
const loadingInterval = Number(config.loadingInterval)

if (user) userid = user._id

export const loadSubjects = () => async (dispatch, getState) => {
  const { lastFetch } = getState().apps.subjects

  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes')
  if (diffInMinutes < loadingInterval) return

  try {
    dispatch(actions.REQUEST_SUBJECTS())
    const { data } = await httpService.get(apiEndPoint, {
      headers: { userid },
    })

    dispatch(actions.GET_SUBJECTS(data))
  } catch (error) {
    console.log(error)
  }
}

export const createSubject = subject => async dispatch => {
  try {
    const { data } = await httpService.post(apiEndPoint, subject)

    dispatch(actions.CREATE_SUBJECT(data))
  } catch (error) {
    console.log(error)
  }
}

export const setSelectedSubject = subject => dispatch => {
  dispatch(actions.SELECT_SUBJECT(subject))
}

export const patchSubject = (id, update) => async dispatch => {
  try {
    const { data } = await httpService.patch(`${apiEndPoint}/${id}`, update)

    dispatch(actions.UPDATE_SUBJECT(data))
  } catch (error) {
    console.log(error)
  }
}

export const toggleSubjectProp = (id, property) => dispatch => {
  dispatch(actions.TOGGLE_SUBJECT_PROP({ id, property }))
}

export const deleteSubject = id => async dispatch => {
  try {
    await httpService.delete(`${apiEndPoint}/${id}`)

    dispatch(actions.DELETE_SUBJECT(id))
    dispatch(loadSubjects())
  } catch (error) {
    console.log(error)
  }
}
