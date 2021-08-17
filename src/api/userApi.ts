import ApiConfig from './apiConfig'

class UserApi extends ApiConfig {
  login = async (email: string, password: string) => {
    return await this.makeRequest('user/login', {
      email,
      password
    })
  }
  registration = async (email: string, password: string) => {
    return await this.makeRequest('user/registration', {
      email,
      password
    })
  }
  logout = async () => {
    return await this.makeRequest('user/logout')
  }

  setAvatar = async (file: Buffer) => {
    return await this.makeRequest('user/uploadAvatar', {
      avatar: file
    })
  }
}

export default new UserApi()
