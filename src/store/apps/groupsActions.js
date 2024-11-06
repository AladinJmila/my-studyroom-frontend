import moment from 'moment'
import httpService from '../services/httpService'
import { getCurrentUser } from '../services/authService'
import * as actions from './groups'
import config from '../../config.json'

const apiEndPoint = '/groups'
let userid
const user = getCurrentUser()
const loadingInterval = Number(config.loadingInterval)

if (user) userid = user._id

export const setSelectedGroup = group => dispatch => {
  dispatch(actions.SELECT_GROUP(group))
}

export const clearSelectedGroup = () => dispatch => {
  dispatch(actions.CLEAR_SELECTED_GROUP())
}
