import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'audioNotes',
  initialState: {
    list: [],
    groups: [],
    loading: false,
    lastFetch: null,
    selectedAudioNote: null,
    subjectsPublic: {},
  },
  reducers: {
    REQUEST_AUDIO_NOTES: (audioNotes, action) => {
      audioNotes.loading = true;
    },

    REQUEST_AUDIO_NOTES_FAIL: (audioNotes, action) => {
      audioNotes.loading = false;
    },

    GET_AUDIO_NOTES_GROUPS: (audioNotes, action) => {
      audioNotes.groups = action.payload;
    },

    CREATE_AUDIO_NOTES_GROUP: (audioNotes, action) => {
      audioNotes.groups.unshift(action.payload);
    },

    GET_AUDIO_NOTES: (audioNotes, action) => {
      // audioNotes.list = action.payload;
      // audioNotes.loading = false;
      // audioNotes.lastFetch = Date.now();
    },

    CREATE_AUDIO_NOTE: (audioNotes, action) => {
      const { groups } = audioNotes;
      const groupIndex = groups.findIndex(g => g._id === action.payload._id);
      groups.splice(groupIndex, 1, action.payload);
    },

    DELETE_ADUIO_NOTE: (audioNotes, action) => {
      const { groups } = audioNotes;
      const groupIndex = groups.findIndex(
        g => g._id === action.payload.groupId
      );

      const audioNoteIndex = groups[groupIndex].children.findIndex(
        a => a._id === action.payload._id
      );

      groups[groupIndex].children.splice(audioNoteIndex, 1);
    },
  },
});

export const {
  REQUEST_AUDIO_NOTES,
  REQUEST_AUDIO_NOTES_FAIL,
  GET_AUDIO_NOTES_GROUPS,
  CREATE_AUDIO_NOTES_GROUP,
  GET_AUDIO_NOTES,
  CREATE_AUDIO_NOTE,
  DELETE_ADUIO_NOTE,
} = slice.actions;
export default slice.reducer;
