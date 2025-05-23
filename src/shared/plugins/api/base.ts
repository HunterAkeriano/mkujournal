import { Configuration } from './gen'
import type { BaseAPI } from './gen/base'
import { InnerAxiosError } from './errors'
import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios'
import { usePluginOptionsStorage } from '@/shared/store/plugin-store'

export type ApiConstructor<T> = new (
  ...args: ConstructorParameters<typeof BaseAPI>
) => T

export interface ApiOptions {
  apiBaseUrl: string
  getAccessToken: () => string
  refreshTokens: () => Promise<void>
  handleReload: () => void
}

const OPTIONS_NOT_PROVIDED_ERROR = new Error('options not provide')

export function useApi<T extends BaseAPI>(apiConstructor: ApiConstructor<T>) {
  const optionsStorage = usePluginOptionsStorage()
  if (!optionsStorage.getApiOptions) {
    throw OPTIONS_NOT_PROVIDED_ERROR
  }

  const options = optionsStorage.getApiOptions()

  const conf = new Configuration({
    accessToken: options.getAccessToken,
  })

  const axiosInstance = axios.create()
  configureAxios(axiosInstance)

  function configureAxios(axiosInstance: AxiosInstance) {
    const configurator = (config: InternalAxiosRequestConfig) =>
      configureRequest(config)
    axiosInstance.interceptors.request.use(configurator)

    axiosInstance.interceptors.response.use((response) => response, handleError)
  }

  function configureRequest(config: InternalAxiosRequestConfig) {
    return config
  }

  async function handleError(error: AxiosError<InnerAxiosError>) {
    const token = options.getAccessToken()
    const originalRequest = error.config

    if (!error.response || !originalRequest?.headers) {
      throw error.response?.data.error
    }

    if (
      error.request.responseType === 'blob' &&
      error.response.data instanceof Blob &&
      error.response.data.type &&
      error.response.data.type.toLowerCase().indexOf('json') != -1
    ) {
      throw JSON.parse(await error.response.data.text()).error
    }

    if (
      !token ||
      error.response.status !== 401 ||
      originalRequest.headers.RepeatRequest
    ) {
      throw error.response?.data
    }

    try {
      await options.refreshTokens()

      const newAccessToken = options.getAccessToken()
      if (newAccessToken) {
        originalRequest.headers.Authorization = `${newAccessToken}`
      }

      originalRequest.headers.RepeatRequest = true

      return await axiosInstance.request(originalRequest)
    } catch (e) {
      if (e instanceof AxiosError) {
        const status = e.response?.status

        if (status === 401) {
          await options.handleReload()
        }

        throw e.response?.data.error
      }

      throw e
    }
  }

  return new apiConstructor(conf, options.apiBaseUrl, axiosInstance)
}
