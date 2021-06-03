import httpService from './httpService'
import { getCurrentUser } from './authService'

const apiEndPoint = '/tasks'

export function getTasks() {
  const user = getCurrentUser()
  let userid
  if (user) userid = user._id

  return httpService.get(apiEndPoint, { headers: { userid } })
}

export function getTask(taskId) {
  return httpService.get(`${apiEndPoint}/${taskId}`)
}

export function saveTask(task) {
  if (task._id) {
    const body = { ...task }
    delete body._id

    return httpService.put(`${apiEndPoint}/${task._id}`, body)
  }

  return httpService.post(apiEndPoint, task)
}

export function deleteTask(taskId) {
  httpService.delete(`${apiEndPoint}/${taskId}`)
}
