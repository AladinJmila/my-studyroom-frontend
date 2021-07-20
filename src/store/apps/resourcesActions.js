import moment from 'moment'
import httpService from '../services/httpService'
import { getCurrentUser } from '../services/authService'
import * as actions from './resources'
import config from '../../config.json'
import { UPDATE_SUBJECT_RESOURCES_COUNT } from './subjects'

const apiEndPoint = '/resources'
let userid
const user = getCurrentUser()
const loadingInterval = Number(config.loadingInterval)

if (user) userid = user._id

export const loadResources = () => async (dispatch, getState) => {
  const { lastFetch } = getState().apps.resources

  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes')
  if (diffInMinutes < loadingInterval) return

  try {
    dispatch(actions.REQUEST_RESOURCES)

    const { data } = await httpService.get(apiEndPoint, { headers: { userid } })

    dispatch(actions.GET_RESOURCES(data))
  } catch (error) {
    console.log(error)
    dispatch(actions.REQUEST_RESOURCES_FAIL())
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

export const createYoutubeResources = body => async dispatch => {
  try {
    const { data } = await httpService.post(
      `${apiEndPoint}/youtubePlaylist`,
      body
    )

    dispatch(actions.CREATE_YOUTUBE_RESOURCES(data))
    dispatch(
      UPDATE_SUBJECT_RESOURCES_COUNT({
        subjectId: body.subjectId,
        count: data.length,
      })
    )
  } catch (error) {
    console.log(error)
  }
}

export const setSelectedResource = resource => dispatch => {
  dispatch(actions.SELECT_RESOURCE(resource))
}

export const clearSelectedResource = () => dispatch => {
  dispatch(actions.CLEAR_SELECTED_RESOURCE())
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
  try {
    await httpService.delete(`${apiEndPoint}/${id}`)

    dispatch(actions.DELETE_RESOURCE(id))
  } catch (error) {
    console.log(error)
  }
}
