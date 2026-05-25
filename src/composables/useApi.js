import axios from 'axios'

export function useApi(baseUrl) {
  const apiBaseUrl = baseUrl || import.meta.env.VITE_API_BASE_URL
  const TOKEN = 'token'
  console.log(apiBaseUrl)

  const apiClient = axios.create({
    baseURL: apiBaseUrl,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  apiClient.interceptors.request.use(
    async (config) => {
      const token = localStorage.getItem(TOKEN)

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  apiClient.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  return apiClient
}
