import httpService from '../services/httpService'
import * as actions from '../api'

const api =
  ({ dispatch }) =>
  next =>
  async action => {
    if (action.type !== actions.apiGetCallBegan.type) return next(action)

    const { apiEndPoint, userid, onStart, onSuccess, onError } = action.payload

    if (onStart) dispatch({ type: onStart })

    next(action)

    try {
      const response = await httpService.get(apiEndPoint, {
        headers: { userid },
      })
      dispatch(actions.apiCallSuccess(response.data))
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data })
    } catch (error) {
      dispatch(actions.apiCallFailed(error.message))
      if (onError) dispatch({ type: onError, payload: error.message })
    }
  }

export default api
