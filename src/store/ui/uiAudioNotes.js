import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'uiAudioNotes',
  initialState: {
    currentPlayingGroup: '',
    currentPlayingGroupProgress: '',
    currentPlayingNote: '',
    currentPlayingNoteProgress: {
      progress: 0,
      total: 0,
    },
  },
  reducers: {
    CURRENT_PLAYING_GROUP: (state, action) => {
      state.currentPlayingGroup = action.payload;
    },
    CURRENT_PLAYING_GOURP_PROGRESS: (state, action) => {
      state.currentPlayingGroupProgress = action.payload;
    },
    CURRENT_PLAYING_NOTE: (state, action) => {
      state.currentPlayingNote = action.payload;
    },
    CURRENT_PLAYING_NOTE_PROGRESS: (state, action) => {
      state.currentPlayingNoteProgress = action.payload;
    },
  },
});

export const {
  CURRENT_PLAYING_GROUP,
  CURRENT_PLAYING_GOURP_PROGRESS,
  CURRENT_PLAYING_NOTE,
  CURRENT_PLAYING_NOTE_PROGRESS,
} = slice.actions;
export default slice.reducer;

export const setCurrentPlayingGroup = payload => dispatch => {
  dispatch(CURRENT_PLAYING_GROUP(payload));
};

export const setCurrentPlayingGroupProgress = payload => dispatch => {
  dispatch(CURRENT_PLAYING_GOURP_PROGRESS(payload));
};

export const setCurrentPlayingNote = payload => dispatch => {
  dispatch(CURRENT_PLAYING_NOTE(payload));
};

export const setCurrentPlayingNoteProgress = payload => dispatch => {
  dispatch(CURRENT_PLAYING_NOTE_PROGRESS(payload));
};
