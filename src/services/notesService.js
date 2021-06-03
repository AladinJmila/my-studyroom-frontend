import httpService from './httpService'
import { getCurrentUser } from './authService'

const apiEndPoint = '/notes'

export function getNotes() {
  const user = getCurrentUser()
  let userid
  if (user) userid = user._id

  return httpService.get(apiEndPoint, { headers: { userid } })
}

export function getNote(noteId) {
  return httpService.get(`${apiEndPoint}/${noteId}`)
}

export function saveNote(note) {
  if (note._id) {
    const body = { ...note }
    delete body._id

    return httpService.put(`${apiEndPoint}/${note._id}`, body)
  }

  return httpService.post(apiEndPoint, note)
}

export function deleteNote(noteId) {
  return httpService.delete(`${apiEndPoint}/${noteId}`)
}
