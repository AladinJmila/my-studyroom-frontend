import { combineReducers } from 'redux'
import appsReducer from './apps/appsReducer'
import uiReducer from './ui/uiParams'
import authReducer from './auth/authParams'

export default combineReducers({
  apps: appsReducer,
  ui: uiReducer,
  auth: authReducer,
})
