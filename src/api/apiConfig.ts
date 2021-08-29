import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

class ApiConfig {
  dbUrl = 'https://cardkeeper-backend.herokuapp.com'
  progressListener = (e: ProgressEvent) => {}

  constructor() {
    axios.interceptors.response.use(config => config, async error => {
      const originalReq = error.config
      if (+error.response.status === 401) {
        try {
          const res = await axios.get('https://cardkeeper-backend.herokuapp.com/user/refresh', {
            withCredentials: true,
          })
          const { accessToken } = res.data
          await AsyncStorage.setItem('accessToken', accessToken)
          this.addToken(accessToken)
          return axios.request(originalReq)
        } catch (e) {
          console.log('Unauthorized user')
        }
      }
    })
  }

  makeRequest = async (
    url: string,
    params?: any,
    method: 'GET' | 'POST' | 'DELETE' = 'POST',
    contentType: string = 'application/json'
  ) => {
    const response = await axios({
      method,
      url: `${this.dbUrl}/${url}`,
      data: params,
      headers: {
        'Content-Type': contentType,
      },
      onUploadProgress: this.progressListener
    })
    return response.data
  }
  addToken = (accessToken: string) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    return this
  }
  addProgressListener = (fn: (e: ProgressEvent) => void) => {
    this.progressListener = fn
  }
  removeProgressListener = () => {
    this.progressListener = () => {}
  }
}

export default ApiConfig
