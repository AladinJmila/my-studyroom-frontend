import moment from 'moment'
import httpService from '../services/httpService'
import { getCurrentUser } from '../../services/authService'
import * as actions from './subjects'
import config from '../../config.json'
import { toast } from 'react-toastify'

const apiEndPoint = '/subjects'
let userid
const user = getCurrentUser()
const loadingInterval = Number(config.loadingInterval)

if (user) userid = user._id

export const loadSubjects = () => async (dispatch, getState) => {
  const { lastFetch } = getState().apps.subjects

  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes')
  if (diffInMinutes < loadingInterval) return

  try {
    dispatch(actions.REQUEST_SUBJECTS())
    const { data } = await httpService.get(apiEndPoint, {
      headers: { userid },
    })

    dispatch(actions.GET_SUBJECTS(data))
  } catch (error) {
    console.log(error)
  }
}

export const loadPublicSubjects = () => async dispatch => {
  try {
    dispatch(actions.REQUEST_SUBJECTS())
    const { data } = await httpService.get(`${apiEndPoint}/public`, {
      headers: { userid },
    })

    dispatch(actions.GET_PUBLIC_SUBJECTS(data))
  } catch (error) {
    console.log(error)
  }
}

export const loadSubject = subjectId => async dispatch => {
  try {
    dispatch(actions.REQUEST_SUBJECTS())

    const { data } = await httpService.get(
      `${apiEndPoint}/details/${subjectId}`
    )

    dispatch(actions.GET_SUBJECT(data))
  } catch (error) {
    console.log(error)
  }
}

export const cloneSubject = subjectId => async dispatch => {
  try {
    const { data } = await httpService.post(`${apiEndPoint}/clone`, {
      subjectId,
    })

    toast('Subject cloned Successfully!')
    dispatch(actions.CLONE_SUBJECT(data))
  } catch (error) {
    console.log(error)
  }
}

export const clearClonedSubject = () => dispatch => {
  dispatch(actions.CLEAR_CLONED_SUBJECT())
}

export const loadOneUserPublicSubjects = creatorId => async dispatch => {
  try {
    dispatch(actions.REQUEST_SUBJECTS())
    const { data } = await httpService.get(`${apiEndPoint}/usersPublic`, {
      headers: { creatorid: creatorId },
    })

    dispatch(actions.GET_ONE_USER_PUBLIC_SUBJECTS({ creatorId, data }))
  } catch (error) {
    console.log(error)
  }
}

export const loadUpvotedSubjects = () => async dispatch => {
  try {
    dispatch(actions.REQUEST_SUBJECTS())
    const { data } = await httpService.get(`${apiEndPoint}/upvoted`, {
      headers: { userid },
    })

    dispatch(actions.GET_UPVOTED_SUBJECTS(data))
  } catch (error) {
    console.log(error)
  }
}

export const loadOneUserUpvotedSubjects = creatorId => async dispatch => {
  try {
    dispatch(actions.REQUEST_SUBJECTS())

    const { data } = await httpService.get(`${apiEndPoint}/usersUpvoted`, {
      headers: { creatorid: creatorId },
    })

    dispatch(actions.GET_ONE_USER_UPVOTED_SUBJECTS({ creatorId, data }))
  } catch (error) {
    console.log(error)
  }
}

export const createSubject = subject => async dispatch => {
  try {
    const { data } = await httpService.post(apiEndPoint, subject)

    dispatch(actions.CREATE_SUBJECT(data))
  } catch (error) {
    console.log(error)
  }
}

export const setSelectedSubject = subject => dispatch => {
  dispatch(actions.SELECT_SUBJECT(subject))
}

export const clearSelectedSubject = () => dispatch => {
  dispatch(actions.CLEAR_SELECTED_SUBJECT())
}

export const patchSubject = (id, update) => async dispatch => {
  try {
    const { data } = await httpService.patch(`${apiEndPoint}/${id}`, update)

    dispatch(actions.UPDATE_SUBJECT(data))
  } catch (error) {
    console.log(error)
  }
}

export const upvoteSubject = (id, update) => async dispatch => {
  try {
    const { data } = await httpService.patch(
      `${apiEndPoint}/upvote/${id}`,
      update
    )

    dispatch(actions.UPDATE_SUBJECT(data))
    // dispatch(loadUpvotedSubjects())
  } catch (error) {
    console.log(error)
  }
}

export const shareSubject = (id, email, authType) => async dispatch => {
  const body = { email, authType }
  try {
    const { data } = await httpService.patch(`${apiEndPoint}/share/${id}`, body)

    dispatch(loadSubjects())
  } catch (error) {
    console.log(error)
  }
}

export const updateSubjectOnEdit = (itemInDb, item, itemName) => dispatch => {
  dispatch(actions.UPDATE_SUBJECT_ON_EDIT({ itemInDb, item, itemName }))
}

export const updateSubjectCheckedItemsCount =
  (subjectId, itemName, value) => dispatch => {
    dispatch(
      actions.UPDATE_SUBJECT_CHECKED_ITEMS_COUNT({ subjectId, itemName, value })
    )
  }

export const updateSubjectItemsCount =
  (item, itemName, operation) => dispatch => {
    dispatch(
      actions.UPDATE_SUBJECT_ITEMS_COUNT({
        item,
        itemName,
        operation,
      })
    )
  }

export const toggleSubjectProp = (id, property) => dispatch => {
  dispatch(actions.TOGGLE_SUBJECT_PROP({ id, property }))
}

export const toggleSubjectUpvote = (id, userId) => dispatch => {
  dispatch(actions.TOGGLE_SUBJECT_UPVOTE({ id, userId }))
}

export const deleteSubject = subject => async dispatch => {
  if (
    subject.numberOfTasks === 0 &&
    subject.numberOfNotes === 0 &&
    subject.numberOfResources === 0 &&
    subject.numberOfPracticals === 0
  ) {
    try {
      await httpService.delete(`${apiEndPoint}/${subject._id}`)

      dispatch(actions.DELETE_SUBJECT(subject._id))
      // dispatch(loadSubjects())
    } catch (error) {
      console.log(error)
    }
  } else {
    toast.error('Subject must be empty to be deleted')
  }
}
