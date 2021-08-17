import axios from 'axios'

class ApiConfig {
  dbUrl = 'https://cardkeeper-backend.herokuapp.com'

  makeRequest = async (url: string, params?: any, method: 'get' | 'post' | 'delete' = 'post') => {
    const response = await axios({
      method,
      url: `${this.dbUrl}/${url}`,
      data: params
    })
    return response.data
  }
}

export default ApiConfig
