import httpService from './httpService'
import { getCurrentUser } from './authService'

const apiEndPoint = '/practicals'

export function getPracticals() {
  const user = getCurrentUser()
  let userid
  if (user) userid = user._id

  return httpService.get(apiEndPoint, { headers: { userid } })
}

export function getPractical(practicalId) {
  return httpService.get(`${apiEndPoint}/${practicalId}`)
}

export function savePractical(practical) {
  if (practical._id) {
    const body = { ...practical }
    delete body._id
    return httpService.put(`${apiEndPoint}/${practical._id}`, body)
  }

  return httpService.post(apiEndPoint, practical)
}

export function deletePractical(mistakeId) {
  httpService.delete(`${apiEndPoint}/${mistakeId}`)
}
