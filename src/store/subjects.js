import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment'
import { apiGetCallBegan, apiSaveCallBegan, apiDeleteCallBegan } from './api'

const slice = createSlice({
  name: 'subjects',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    subjectsRequested: (subjects, action) => {
      subjects.loading = true
    },

    subjectsReceived: (subjects, action) => {
      subjects.list = action.payload
      subjects.loading = false
      subjects.lastFetch = Date.now()
    },

    subjectsRequestFailed: (subjects, action) => {
      subjects.loading = false
    },

    subjectAdded: (subjects, action) => {
      subjects.list.push({
        name: action.payload.name,
        userId: action.payload.userId,
      })
    },

    subjectDeleted: (subjects, action) => {
      const index = subjects.list.findIndex(
        subject => subject._id === action.payload.itemId
      )
      subjects.list.splice(index, 1)
    },
  },
})

export const {
  subjectsRequested,
  subjectsReceived,
  subjectsRequestFailed,
  subjectAdded,
  subjectDeleted,
} = slice.actions
export default slice.reducer

// Action Creators
const apiEndPoint = '/subjects'

export const loadSubjects = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.subjects

  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes')
  if (diffInMinutes < 10) return

  dispatch(
    apiGetCallBegan({
      apiEndPoint,
      onStart: subjectsRequested.type,
      onSuccess: subjectsReceived.type,
      onError: subjectsRequestFailed.type,
    })
  )
}

export const addSubject = subject =>
  apiSaveCallBegan({
    apiEndPoint,
    data: subject,
    // onSuccess: subjectAdded.type,
  })

export const deleteSubject = subjectId =>
  apiDeleteCallBegan({
    apiEndPoint,
    itemId: subjectId,
    // onSuccess: subjectDeleted.type,
  })
// Selector
