import httpService from './httpService'

const apiEndPoint = '/users'

export function register(user) {
  return httpService.post(apiEndPoint, {
    name: user.username,
    email: user.email,
    password: user.password,
  })
}
