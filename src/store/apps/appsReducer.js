import { combineReducers } from 'redux'
import subjectsReducer from './subjects'
import tasksReducer from './tasks'

export default combineReducers({
  subjects: subjectsReducer,
  tasks: tasksReducer,
})
