import axios from 'axios'

class ApiConfig {
  dbUrl = 'https://cardkeeper-backend.herokuapp.com'

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
    })
    return response.data
  }
  addToken = (accessToken: string) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    return this
  }
}

export default ApiConfig
