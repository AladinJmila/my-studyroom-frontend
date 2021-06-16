import { combineReducers } from 'redux'
import subjectsReducer from './subjects'
import tasksReducer from './tasks'
import notesReducer from './notes'
import resourcesReducer from './resources'

export default combineReducers({
  subjects: subjectsReducer,
  tasks: tasksReducer,
  notes: notesReducer,
  resources: resourcesReducer,
})
