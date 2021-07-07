import { combineReducers } from 'redux'
import intervalsReducer from './intervals'
import loopsReducer from './loops'

export default combineReducers({
  intervals: intervalsReducer,
  loops: loopsReducer,
})
