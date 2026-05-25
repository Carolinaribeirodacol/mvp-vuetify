import { jwtDecode } from 'jwt-decode'

export function useAuth() {
  const getUserId = () => {
    const token = localStorage.getItem('token')

    if (!token) return null

    const decode = jwtDecode(token)

    return decode?.user_id || null
  }

  const isTokenExpired = () => {
    const token = localStorage.getItem('token')

    if (!token) return true

    try {
      const decoded = jwtDecode(token)

      if (!decoded.exp) return true

      const expirationTime = decoded.exp * 1000
      const currentTime = Date.now()

      return currentTime >= expirationTime
    } catch (error) {
      return true
    }
  }

  return {
    getUserId,
    isTokenExpired,
  }
}
