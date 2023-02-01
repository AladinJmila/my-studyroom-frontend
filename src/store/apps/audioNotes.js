import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'audioNotes',
  initialState: {
    list: [],
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

    GET_AUDIO_NOTES: (audioNotes, action) => {
      audioNotes.list = action.payload;
      audioNotes.loading = false;
    },

    CREATE_AUDIO_NOTES_GROUP: (audioNotes, action) => {
      audioNotes.list.push(action.payload);
    },

    CREATE_AUDIO_NOTE: (audioNotes, action) => {
      const { list } = audioNotes;
      const groupIndex = list.findIndex(g => g._id === action.payload._id);
      list.splice(groupIndex, 1, action.payload);
    },

    UPDATE_AUDIO_NOTE: (audioNotes, action) => {
      const { list } = audioNotes;
      const { data: newAudioNote, update } = action.payload;
      const groupIndex = list.findIndex(g => g._id === newAudioNote.groupId);

      const audioNoteIndex = list[groupIndex].children.findIndex(
        a => a._id === newAudioNote._id
      );

      if (update.hasOwnProperty('isChecked')) {
        if (newAudioNote.isChecked) {
          list[groupIndex].props.remainingDuration =
            list[groupIndex].props.remainingDuration -
            newAudioNote.track.duration * newAudioNote.reps;
        } else {
          list[groupIndex].props.remainingDuration +=
            newAudioNote.track.duration * newAudioNote.reps;
        }
      }

      if (update.hasOwnProperty('reps')) {
        list[groupIndex].props.totalDuration -=
          list[groupIndex].children[audioNoteIndex].track.duration *
          list[groupIndex].children[audioNoteIndex].reps;
        list[groupIndex].props.totalDuration +=
          newAudioNote.track.duration * newAudioNote.reps;

        list[groupIndex].props.remainingDuration -=
          list[groupIndex].children[audioNoteIndex].track.duration *
          list[groupIndex].children[audioNoteIndex].reps;
        list[groupIndex].props.remainingDuration +=
          newAudioNote.track.duration * newAudioNote.reps;
      }

      list[groupIndex].children.splice(audioNoteIndex, 1, newAudioNote);
    },

    DELETE_AUDIO_NOTE_GROUP: (audioNotes, action) => {
      const groupIndex = audioNotes.list.findIndex(
        g => g._id === action.payload
      );
      audioNotes.list.splice(groupIndex, 1);
    },

    DELETE_AUDIO_NOTE: (audioNotes, action) => {
      const { list } = audioNotes;
      const audioNote = action.payload;
      const groupIndex = list.findIndex(g => g._id === audioNote.groupId);

      const audioNoteIndex = list[groupIndex].children.findIndex(
        a => a._id === audioNote._id
      );

      list[groupIndex].props.totalDuration -=
        audioNote.track.duration * audioNote.reps;
      if (!audioNote.isChecked) {
        list[groupIndex].props.remainingDuration -=
          audioNote.track.duration * audioNote.reps;
      }

      list[groupIndex].children.splice(audioNoteIndex, 1);
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
  UPDATE_AUDIO_NOTE,
  DELETE_AUDIO_NOTE_GROUP,
  DELETE_AUDIO_NOTE,
} = slice.actions;
export default slice.reducer;
