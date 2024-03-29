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
  addCard = async (
    frontFace: string,
    backFace: string,
    qrCodes: string[],
    cardName: string,
    checkLoadProgress: (e: ProgressEvent) => void
  ) => {
    this.addProgressListener(checkLoadProgress)
    const res =  await this.makeRequest('user/addCard', {
      cardFaces: [
        { base64: frontFace, type: 'image/jpeg' },
        { base64: backFace, type: 'image/jpeg' }
      ],
      qrCodes,
      cardName,
    })
    this.removeProgressListener()

    return res
  }
  changeCardName = async (id: string, newCardName: string) => {
    return await this.makeRequest('user/changeCard', {
      cardId: id,
      newCardName,
    }, 'POST')
  }
  deleteCard = async (id: string) => {
    return await this.makeRequest('user/deleteCard', {
      cardId: id,
    }, 'DELETE')
  }
}

export default new UserApi()
