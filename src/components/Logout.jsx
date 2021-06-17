import { useEffect } from 'react'
import { logout } from '../store/services/authService'

const Logout = () => {
  useEffect(() => {
    logout()

    window.location = '/'
  }, [])
  return null
}

export default Logout
