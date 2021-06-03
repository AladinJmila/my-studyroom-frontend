import httpService from './httpService'
import { getCurrentUser } from './authService'

const apiEndPoint = '/resources'

export function getResources() {
  const user = getCurrentUser()
  let userid
  if (user) userid = user._id

  return httpService.get(apiEndPoint, { headers: { userid } })
}

export function getResource(resourceId) {
  return httpService.get(`${apiEndPoint}/${resourceId}`)
}

export function saveResource(resource) {
  if (resource._id) {
    const body = { ...resource }
    delete body._id

    return httpService.put(`${apiEndPoint}/${resource._id}`, body)
  }

  return httpService.post(apiEndPoint, resource)
}

export function deleteResource(resourceId) {
  httpService.delete(`${apiEndPoint}/${resourceId}`)
}
