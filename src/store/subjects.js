import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'subjects',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    REQUEST_SUBJECTS: (subjects, action) => {
      subjects.loading = true
    },

    REQUEST_SBUJECTS_FAIL: (subjects, action) => {
      subjects.loading = false
    },

    GET_SUBJECTS: (subjects, action) => {
      subjects.list = action.payload
      subjects.loading = false
      subjects.lastFetch = Date.now()
    },

    CREATE_SUBJECT: (subjects, action) => {
      subjects.list.push(action.payload)
    },

    PATCH_SUBJECT: (subjects, action) => {
      subjects.list.map(subject =>
        subject._id === action.payload._id ? action.payload : subject
      )
    },

    TOGGLE_SUBJECT_PROP: (subjects, action) => {
      const { id, property } = action.payload
      const index = subjects.list.findIndex(subject => subject._id === id)
      subjects.list[index][property] = !subjects.list[index][property]
    },

    DELETE_SUBJECT: (subjects, action) => {
      subjects.list.filter(subject => subject._id !== action.payload)
    },
  },
})

export const {
  REQUEST_SUBJECTS,
  REQUEST_SBUJECTS_FAIL,
  GET_SUBJECTS,
  CREATE_SUBJECT,
  PATCH_SUBJECT,
  TOGGLE_SUBJECT_PROP,
  DELETE_SUBJECT,
} = slice.actions
export default slice.reducer

// Action Creators

// export const loadSubjects = () => (dispatch, getState) => {
//   const { lastFetch } = getState().entities.subjects

//   const diffInMinutes = moment().diff(moment(lastFetch), 'minutes')
//   if (diffInMinutes < 10) return

//   dispatch(
//     apiGetCallBegan({
//       apiEndPoint,
//       onStart: subjectsRequested.type,
//       onSuccess: subjectsReceived.type,
//       onError: subjectsRequestFailed.type,
//     })
//   )
// }

// export const addSubject = subject =>
//   apiSaveCallBegan({
//     apiEndPoint,
//     data: subject,
//     // onSuccess: subjectAdded.type,
//   })

// export const deleteSubject = subjectId =>
//   apiDeleteCallBegan({
//     apiEndPoint,
//     itemId: subjectId,
//     // onSuccess: subjectDeleted.type,
//   })
// Selector
