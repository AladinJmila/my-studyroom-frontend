import { combineReducers } from 'redux'
import subjectsReducer from './subjects'
import tasksReducer from './tasks'
import notesReducer from './notes'
import resourcesReducer from './resources'
import practicalsReducer from './practicals'
import sessionsReducer from './sessions'
import loopsReducer from './loops'
import intervalsReducer from './intervals'
import timerRecordsReducer from './timerRecords'
import audioNotesReducer from './audioNotes'
import groupsReducer from './groups'

export default combineReducers({
  subjects: subjectsReducer,
  tasks: tasksReducer,
  notes: notesReducer,
  audioNotes: audioNotesReducer,
  groups: groupsReducer,
  resources: resourcesReducer,
  practicals: practicalsReducer,
  sessions: sessionsReducer,
  loops: loopsReducer,
  intervals: intervalsReducer,
  timerRecords: timerRecordsReducer,
})
