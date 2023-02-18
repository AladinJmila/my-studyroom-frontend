import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'uiParams',
  initialState: {
    tasksPerSubject: {},
    notesPerSubject: {},
    resourcesPerSubject: {},
    practicalsPerSubject: {},
    audioNotesPerSubject: {},
    totalSessions: null,
  },
  reducers: {
    TASKS_PER_SUBJECT: (state, action) => {
      const { subjectName, num } = action.payload;
      state.tasksPerSubject[subjectName] = num;
    },

    NOTES_PER_SUBJECT: (state, action) => {
      const { subjectName, num } = action.payload;
      state.notesPerSubject[subjectName] = num;
    },

    RESOURCES_PER_SUBJECT: (state, action) => {
      const { subjectName, num } = action.payload;
      state.resourcesPerSubject[subjectName] = num;
    },

    PRACTICALS_PER_SUBJECT: (state, action) => {
      const { subjectName, num } = action.payload;
      state.practicalsPerSubject[subjectName] = num;
    },

    AUDIO_NOTES_PER_SUBJECT: (state, action) => {
      const { subjectName, num } = action.payload;
      state.audioNotesPerSubject[subjectName] = num;
    },

    SET_TOTAL_SESSIONS: (state, action) => {
      state.totalSessions = action.payload;
    },
  },
});

export const {
  TASKS_PER_SUBJECT,
  NOTES_PER_SUBJECT,
  RESOURCES_PER_SUBJECT,
  PRACTICALS_PER_SUBJECT,
  AUDIO_NOTES_PER_SUBJECT,
  SET_TOTAL_SESSIONS,
} = slice.actions;
export default slice.reducer;

// Action creators

export const setTasksPerSubject = (subjectName, num) => dispatch => {
  dispatch(TASKS_PER_SUBJECT({ subjectName, num }));
};

export const setNotesPerSubject = (subjectName, num) => dispatch => {
  dispatch(NOTES_PER_SUBJECT({ subjectName, num }));
};

export const setResourcesPerSubject = (subjectName, num) => dispatch => {
  dispatch(RESOURCES_PER_SUBJECT({ subjectName, num }));
};

export const setPracticalsPerSubject = (subjectName, num) => dispatch => {
  dispatch(PRACTICALS_PER_SUBJECT({ subjectName, num }));
};

export const setAudioNotesPerSubject = (subjectName, num) => dispatch => {
  dispatch(AUDIO_NOTES_PER_SUBJECT({ subjectName, num }));
};

export const setTotalSessions = num => dispatch => {
  dispatch(SET_TOTAL_SESSIONS(num));
};
