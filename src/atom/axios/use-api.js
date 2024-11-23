import axios from 'axios'
import { useToast } from 'vue-toastification'

const toast = useToast()
let isFetching = false
let retryTimeout = null
const requestLimit = 1
let requestCount = 0
let lastRequestTime = 0

export const axiosInstance = axios.create({
  baseURL: 'https://www.mku-journal.online/',
  withCredentials: true,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

function canMakeRequest() {
  const currentTime = Date.now()
  const elapsedTime = currentTime - lastRequestTime

  if (elapsedTime < 1000 && requestCount >= requestLimit) {
    return false
  }

  lastRequestTime = currentTime
  requestCount++
  return true
}

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

export const handleRequestWithQueue = async (
  endpoint,
  body = null,
  method = 'GET'
) => {
  if (canMakeRequest()) {
    isFetching = true
    const responseData = await performRequest(endpoint, body, method)
    isFetching = false
    return responseData
  } else {
    toast.error(t('tooManyRequest'))
  }
}

export const handleRequest = async (endpoint, body = null, method = 'GET') => {
  return await performRequest(endpoint, body, method)
}

const handleError = (error) => {
  const errorMessage = error.response?.data?.detail || 'Помилка запиту'
  toast.error(errorMessage)
  isFetching = false
  if (!retryTimeout) {
    retryTimeout = setTimeout(() => {
      retryTimeout = null
    }, 5000)
  }
}

function getToken() {
  const value = `; ${document.cookie}`
  const parts = value.split(`; access=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
}

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
