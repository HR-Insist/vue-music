import axios from 'axios'
import {
  Message,
  Loading
} from 'element-ui';
import store from '@/store'

const BASE_URL = 'http://localhost:3000'

export const requestWithoutLoading = createBaseInstance()

const request = createBaseInstance();

mixinLoading(request.interceptors)

function createBaseInstance() {
  const instance = axios.create({
    baseURL: BASE_URL,
  })

  instance.interceptors.response.use(handleResponse, handleError)
  return instance
}

function handleResponse(response) {
  return response.data
}

function handleError(e) {
  Message.error(e.Message)
  throw e
}

let loading
let loadingCount = 0
const SET_AXIOS_LOADING = 'global/setAxiosLoading'

function mixinLoading(interceptors) {
  interceptors.request.use(loadingRequestInterceptor)
  interceptors.response.use(
    loadingResponseInterceptor,
    loadingResponseErrorInterceptor
  )

  function loadingRequestInterceptor(config) {
    if (!loading) {
      loading = Loading.service({
        target: 'body',
        background: 'transparent',
        text: '载入中',
      })
      store.commit(SET_AXIOS_LOADING, true)
    }
    loadingCount++

    return config
  }

  function handleResponseLoading() {
    loadingCount--
    if (loadingCount === 0) {
      loading.close()
      loading = null
      store.commit(SET_AXIOS_LOADING, false)
    }
  }

  function loadingResponseInterceptor(response) {
    handleResponseLoading()
    return response
  }

  function loadingResponseErrorInterceptor(e) {
    handleResponseLoading()
    throw e
  }
}


export default request