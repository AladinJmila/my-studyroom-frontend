import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'subjects',
  initialState: {
    list: [],
    public: [],
    upvoted: [],
    usersPublic: {},
    usersUpvoted: {},
    loading: false,
    lastFetch: null,
    selectedSubject: null,
  },
  reducers: {
    REQUEST_SUBJECTS: (subjects, action) => {
      subjects.loading = true
    },

    REQUEST_SUBJECTS_FAIL: (subjects, action) => {
      subjects.loading = false
    },

    GET_SUBJECTS: (subjects, action) => {
      subjects.list = action.payload
      subjects.loading = false
      subjects.lastFetch = Date.now()
    },

    GET_SUBJECT: (subjects, action) => {
      subjects.selectedSubject = action.payload
    },

    GET_PUBLIC_SUBJECTS: (subjects, action) => {
      subjects.public = action.payload
      subjects.loading = false
    },

    GET_ONE_USER_PUBLIC_SUBJECTS: (subjects, action) => {
      const { creatorId, data } = action.payload
      subjects.usersPublic[creatorId] = data
      data.forEach(item => {
        if (!subjects.public.find(s => s._id === item._id))
          subjects.public.push(item)
      })
      subjects.loading = false
    },

    GET_UPVOTED_SUBJECTS: (subjects, action) => {
      subjects.upvoted = action.payload
      subjects.loading = false
    },

    GET_ONE_USER_UPVOTED_SUBJECTS: (subjects, action) => {
      const { creatorId, data } = action.payload
      subjects.usersUpvoted[creatorId] = data
      subjects.loading = false
    },

    CREATE_SUBJECT: (subjects, action) => {
      subjects.list.unshift(action.payload)
    },

    SELECT_SUBJECT: (subjects, action) => {
      subjects.selectedSubject = action.payload
    },

    CLEAR_SELECTED_SUBJECT: (subjects, action) => {
      subjects.selectedSubject = null
    },

    UPDATE_SUBJECT: (subjects, action) => {
      const index = subjects.list.findIndex(s => s._id === action.payload._id)
      subjects.list[index] = action.payload
    },

    UPDATE_SUBJECT_ON_EDIT: (subjects, action) => {
      const { itemInDb, item, itemName } = action.payload
      if (itemInDb.subject._id !== item.subjectId) {
        let index = subjects.list.findIndex(s => s._id === itemInDb.subject._id)
        const prevSubject = subjects.list[index]
        index = subjects.list.findIndex(s => s._id === item.subjectId)
        const newSubject = subjects.list[index]
        if (itemInDb.isChecked) {
          prevSubject[`numberOfChecked${itemName}`]--
          newSubject[`numberOfChecked${itemName}`]++
        } else {
          prevSubject[`numberOf${itemName}`]--
          newSubject[`numberOf${itemName}`]++
        }
      }
    },

    UPDATE_SUBJECT_CHECKED_ITEMS_COUNT: (subjects, action) => {
      const { subjectId, itemName, value } = action.payload
      const index = subjects.list.findIndex(s => s._id === subjectId)
      value.isChecked
        ? subjects.list[index][`numberOfChecked${itemName}`]++
        : subjects.list[index][`numberOfChecked${itemName}`]--
    },

    UPDATE_SUBJECT_ITEMS_COUNT: (subjects, action) => {
      const { item, itemName, operation } = action.payload
      const index = subjects.list.findIndex(
        s => s._id === item?.subject?._id || item.subjectId
      )
      if (operation === 'create') {
        subjects.list[index][`numberOf${itemName}`]++
      } else if (operation === 'delete') {
        if (item.isChecked) subjects.list[index][`numberOfChecked${itemName}`]--
        subjects.list[index][`numberOf${itemName}`]--
      }
    },

    UPDATE_SUBJECT_RESOURCES_COUNT: (subjects, action) => {
      const { subjectId, count } = action.payload
      const index = subjects.list.findIndex(s => s._id === subjectId)
      subjects.list[index].numberOfResources += count
    },

    TOGGLE_SUBJECT_PROP: (subjects, action) => {
      const { id, property } = action.payload
      const index = subjects.list.findIndex(s => s._id === id)
      subjects.list[index][property] = !subjects.list[index][property]
    },

    TOGGLE_SUBJECT_UPVOTE: (subjects, action) => {
      const { id, userId } = action.payload
      let index = subjects.list.findIndex(s => s._id === id)
      if (index === -1) {
        index = subjects.public.findIndex(s => s._id === id)
        const userIdIndex = subjects.public[index].upvotes.findIndex(
          uId => uId === userId
        )
        userIdIndex === -1
          ? subjects.public[index].upvotes.push(userId)
          : subjects.public[index].upvotes.splice(userIdIndex, 1)
      } else {
        const userIdIndex = subjects.list[index].upvotes.findIndex(
          uId => uId === userId
        )
        userIdIndex === -1
          ? subjects.list[index].upvotes.push(userId)
          : subjects.list[index].upvotes.splice(userIdIndex, 1)
      }
    },

    DELETE_SUBJECT: (subjects, action) => {
      const index = subjects.list.findIndex(s => s._id === action.payload)
      subjects.list.splice(index, 1)
    },
  },
})

export const {
  REQUEST_SUBJECTS,
  REQUEST_SUBJECTS_FAIL,
  GET_SUBJECTS,
  GET_SUBJECT,
  GET_PUBLIC_SUBJECTS,
  GET_ONE_USER_PUBLIC_SUBJECTS,
  GET_UPVOTED_SUBJECTS,
  GET_ONE_USER_UPVOTED_SUBJECTS,
  CREATE_SUBJECT,
  SELECT_SUBJECT,
  CLEAR_SELECTED_SUBJECT,
  UPDATE_SUBJECT,
  UPDATE_SUBJECT_ON_EDIT,
  UPDATE_SUBJECT_CHECKED_ITEMS_COUNT,
  UPDATE_SUBJECT_ITEMS_COUNT,
  UPDATE_SUBJECT_RESOURCES_COUNT,
  TOGGLE_SUBJECT_PROP,
  TOGGLE_SUBJECT_UPVOTE,
  DELETE_SUBJECT,
} = slice.actions
export default slice.reducer
