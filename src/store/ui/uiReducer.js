import { combineReducers } from 'redux';
import uiParamsReducer from './uiParams';
import uiAudioNotesReducer from './uiAudioNotes';

export default combineReducers({
  general: uiParamsReducer,
  audioNotes: uiAudioNotesReducer,
});
