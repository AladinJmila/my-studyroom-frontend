import httpService from '../services/httpService'
import * as actions from '../api'

const api =
  ({ dispatch }) =>
  next =>
  async action => {
    if (action.type !== actions.apiDeleteCallBegan.type) return next(action)

    const { apiEndPoint, itemId, onSuccess, onError } = action.payload

    next(action)

    try {
      const response = await httpService.delete(`${apiEndPoint}/${itemId}`)
      dispatch(actions.apiCallSuccess(response.data))
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data })
    } catch (error) {
      dispatch(actions.apiCallFailed(error.message))
      if (onError) dispatch({ type: onError, payload: error.message })
    }
  }

export default api
