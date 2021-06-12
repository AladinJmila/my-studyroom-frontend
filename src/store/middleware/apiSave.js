import httpService from '../services/httpService'
import * as actions from '../api'

const api =
  ({ dispatch }) =>
  next =>
  async action => {
    if (action.type !== actions.apiSaveCallBegan.type) return next(action)

    const { apiEndPoint, data, onSuccess, onError } = action.payload

    next(action)

    let response

    try {
      if (data._id) {
        const body = { ...data }
        delete body._id

        response = await httpService.put(`${apiEndPoint}/${data._id}`, body)
      } else {
        response = await httpService.post(apiEndPoint, data)
      }
      dispatch(actions.apiCallSuccess(response.data))
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data })
    } catch (error) {
      dispatch(actions.apiCallFailed(error.message))
      if (onError) dispatch({ type: onError, payload: error.message })
    }
  }

export default api
