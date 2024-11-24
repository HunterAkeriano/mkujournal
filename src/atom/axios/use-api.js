import axios from 'axios'
import { useToast } from 'vue-toastification'
import { useCookiesStorage } from '@/molecules/utils/cookies.js'

const toast = useToast()

export const axiosInstance = axios.create({
  baseURL: 'https://www.mku-journal.online/',
  withCredentials: true,
})

const refreshToken = async () => {
  const currentRefreshToken = getRefreshToken()

  if (!currentRefreshToken) {
    throw new Error('No refresh token available')
  }

  try {
    const response = await axios.post(
      'https://www.mku-journal.online/auth/refresh-token',
      {
        refreshToken: currentRefreshToken,
      }
    )

    useCookiesStorage('access_token').setItem(response.data.accessToken)
    useCookiesStorage('refresh_token').setItem(response.data.refreshToken)

    return response.data.accessToken
  } catch (error) {
    throw new Error('Failed to refresh token')
  }
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true

      try {
        const result = await refreshToken()
        if (result) {
          return axiosInstance.request(originalRequest)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  }
)

async function performRequest(endpoint, body, method) {
  let response
  if (method === 'GET') {
    response = await axiosInstance.get(endpoint, { params: body })
  } else if (method === 'POST') {
    response = await axiosInstance.post(endpoint, body)
  } else if (method === 'DELETE') {
    response = await axiosInstance.delete(endpoint, body)
  } else if (method === 'PATCH') {
    try {
      response = await axiosInstance.patch(endpoint, body)
    } catch (e) {
      toast.error('Помилка оновлення')
      response = 'error'
    }
  } else {
    throw new Error('Unsupported HTTP method')
  }

  return response.data
}

export const handleRequest = async (endpoint, body = null, method = 'GET') => {
  return await performRequest(endpoint, body, method)
}

function getToken() {
  const value = `; ${document.cookie}`
  const parts = value.split(`; access_token=`)
  if (parts.length === 2) {
    return parts.pop().split(';')[0].trim()
  }
  return null
}

function getRefreshToken() {
  const value = `; ${document.cookie}`
  const parts = value.split(`; refresh_token=`)
  if (parts.length === 2) {
    return parts.pop().split(';')[0].trim()
  }
  return null
}

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.authorization = `${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
