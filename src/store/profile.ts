import { makeAutoObservable } from 'mobx'
import userApi from '../api/userApi'
import settings from './settings'
import cards from './cards'
import alert from './alert'

class Profile {
  email: string | null = null
  avatar: string | null = null
  userId: string | null = null
  isActivated: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  logUserIn = async (email: string, password: string) => {
    try {
      const data = await userApi.login(email, password)
      const { id, avatar, isActivated } = data.user
      this.setUserId(id)
      this.setUserEmail(email)
      this.setIsActivated(isActivated)
      this.setAvatar(avatar)

      settings.setSettings(data.user.settings)
      cards.setCards(data.user.cards)
    } catch (e) {
      alert.showAlertMessage('error', e.response.data.message)
    }
  }
  registerNewUser = async (email: string, password: string) => {
    try {
      const data = await userApi.registration(email, password)
      const { id, avatar, isActivated } = data.user
      this.setUserId(id)
      this.setUserEmail(email)
      this.setIsActivated(isActivated)
      this.setAvatar(avatar)

      settings.setSettings(data.user.settings)
      cards.setCards(data.user.cards)
    } catch (e) {
      alert.showAlertMessage('error', e.response.data.message)
    }
  }

  setUserId(id: string) {
    this.userId = id
  }
  setUserEmail(email: string) {
    this.email = email
  }
  setIsActivated(isActivated: boolean) {
    this.isActivated = isActivated
  }
  setAvatar(avatar: string) {
    this.avatar = avatar
  }
}

export default new Profile()
