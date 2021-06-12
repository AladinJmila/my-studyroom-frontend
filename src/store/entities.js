import { combineReducers } from 'redux'
import subjectsReducer from './subjects'

export default combineReducers({
  subjects: subjectsReducer,
})
