import ApiConfig from './apiConfig'

class UserApi extends ApiConfig {
  login = async (email: string, password: string) => {
    return await this.makeRequest('user/login', {
      email,
      password
    })
  }
  autoLogin = async (userId: string, refreshToken: string) => {
    return await this.makeRequest('user/autoLogin', {
      id: userId,
      refreshToken
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
