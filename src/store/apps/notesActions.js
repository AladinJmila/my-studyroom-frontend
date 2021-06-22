import moment from 'moment'
import httpService from '../services/httpService'
import { getCurrentUser } from '../services/authService'
import * as actions from './notes'

const apiEndPoint = '/notes'
let userid
const user = getCurrentUser()
if (user) userid = user._id

export const loadNotes = () => async dispatch => {
  try {
    const { data } = await httpService.get(apiEndPoint, { headers: { userid } })

    dispatch(actions.GET_NOTES(data))
  } catch (error) {
    console.log(error)
  }
}

export const createNote = note => async dispatch => {
  try {
    const { data } = await httpService.post(apiEndPoint, note)

    dispatch(actions.CREATE_NOTE(data))
    dispatch(loadNotes())
  } catch (error) {
    console.log(error)
  }
}

export const setSelectedNote = note => dispatch => {
  dispatch(actions.SELECT_NOTE(note))
}

export const updateNote = note => async dispatch => {
  const body = { ...note }
  delete body._id

  try {
    const { data } = await httpService.put(`${apiEndPoint}/${note._id}`, body)

    dispatch(actions.UPDATE_NOTE(data))
    dispatch(loadNotes())
  } catch (error) {
    console.log(error)
  }
}

export const clearSelectedNote = () => dispatch => {
  dispatch(actions.CLEAR_SELECTED_NOTE())
}

export const patchNote = (id, update) => async dispatch => {
  try {
    const { data } = await httpService.patch(`${apiEndPoint}/${id}`, update)

    dispatch(actions.UPDATE_NOTE(data))
    dispatch(loadNotes())
  } catch (error) {
    console.log(error)
  }
}

export const toggleNoteProp = (id, property) => dispatch => {
  dispatch(actions.TOGGLE_NOTE_PROP({ id, property }))
}

export const deleteNote = id => async dispatch => {
  try {
    await httpService.delete(`${apiEndPoint}/${id}`)

    dispatch(actions.DELETE_NOTE(id))
    dispatch(loadNotes())
  } catch (error) {
    console.log(error)
  }
}

// export const setFilteredNotes = filtered => dispatch => {
//   dispatch(actions.FILTER_NOTES(filtered))
// }
