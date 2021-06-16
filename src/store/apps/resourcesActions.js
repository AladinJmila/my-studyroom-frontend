import moment from 'moment'
import httpService from '../services/httpService'
import { getCurrentUser } from '../services/authService'
import * as actions from './resources'

const apiEndPoint = '/resources'
let userid
const user = getCurrentUser()
if (user) userid = user._id

export const loadResources = () => async dispatch => {
  try {
    const { data } = await httpService.get(apiEndPoint, { headers: { userid } })

    dispatch(actions.GET_RESOURCES(data))
  } catch (error) {
    console.log(error)
  }
}

export const createResource = resource => async dispatch => {
  try {
    const { data } = await httpService.post(apiEndPoint, resource)

    dispatch(actions.CREATE_RESOURCE(data))
  } catch (error) {
    console.log(error)
  }
}

export const setSelectedResource = resource => dispatch => {
  dispatch(actions.SELECT_RESOURCE(resource))
}

export const updateResource = resource => async dispatch => {
  const body = { ...resource }
  delete body._id

  try {
    const { data } = await httpService.put(
      `${apiEndPoint}/${resource._id}`,
      body
    )

    dispatch(actions.UPDATE_RESOURCE(data))
  } catch (error) {
    console.log(error)
  }
}

export const clearSelectedResource = () => dispatch => {
  dispatch(actions.CLEAR_SELECTED_RESOURCE())
}

export const patchResource = (id, update) => async dispatch => {
  try {
    const { data } = await httpService.patch(`${apiEndPoint}/${id}`, update)

    dispatch(actions.UPDATE_RESOURCE(data))
  } catch (error) {
    console.log(error)
  }
}

export const toggleResourceProp = (id, property) => dispatch => {
  dispatch(actions.TOGGLE_RESOURCE_PROP({ id, property }))
}

export const deleteResource = id => async dispatch => {
  await httpService.delete(`${apiEndPoint}/${id}`)

  dispatch(actions.DELETE_RESOURCE(id))
}
