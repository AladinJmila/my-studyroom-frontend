import httpService from './httpService'
import { getCurrentUser } from './authService'

const apiEndPoint = '/subjects'

export function getSubjects() {
  const user = getCurrentUser()
  let userid
  if (user) userid = user._id

  return httpService.get(apiEndPoint, { headers: { userid } })
}

export function getSubject(subjectId) {
  return httpService.get(`${apiEndPoint}/${subjectId}`)
}

export function saveSubject(subject) {
  if (subject._id) {
    const body = { ...subject }
    delete body._id
    return httpService.put(`${apiEndPoint}/${subject._id}`, body)
  }
  console.log(subject)
  return httpService.post(apiEndPoint, subject)
}

export function deleteSubject(subjectId) {
  httpService.delete(`${apiEndPoint}/${subjectId}`)
}
