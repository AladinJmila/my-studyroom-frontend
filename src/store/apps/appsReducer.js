import { combineReducers } from 'redux'
import subjectsReducer from './subjects'
import tasksReducer from './tasks'
import notesReducer from './notes'
import resourcesReducer from './resources'
import practicalsReducer from './practicals'
import schedulesReducer from './schedules'
import loopsReducer from './loops'
import intervalsReducer from './intervals'

export default combineReducers({
  subjects: subjectsReducer,
  tasks: tasksReducer,
  notes: notesReducer,
  resources: resourcesReducer,
  practicals: practicalsReducer,
  schedules: schedulesReducer,
  loops: loopsReducer,
  intervals: intervalsReducer,
})
