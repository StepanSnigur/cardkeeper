import { makeAutoObservable } from 'mobx'
import AsyncStorage from '@react-native-async-storage/async-storage'
import userApi from '../api/userApi'
import settings, { ISettings } from './settings'
import cards, { ICardData } from './cards'
import alert from './alert'

class Profile {
  email: string | null = null
  avatar: string | null = null
  userId: string | null = null
  accessToken: string | null = null
  isActivated: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  checkAutoLogin = async () => {
    try {
      const refreshData = await AsyncStorage.getItem('refreshData')
      if (!refreshData) return false
      const { id, refreshToken } = JSON.parse(refreshData)
      if (!id || !refreshToken) return false

      const data = await userApi.autoLogin(id, refreshToken)
      const { email, isActivated, avatar, settings, cards } = data.user
      this.setAccessToken(data.accessToken)
      this.setUser(id, email, isActivated, avatar, settings, cards)
    } catch (e) {
      alert.showAlertMessage('error', 'Автоматический вход в приложение не удался')
    }
  }
  logUserIn = async (email: string, password: string, rememberMe: boolean) => {
    try {
      const data = await userApi.login(email, password)
      const { id, avatar, isActivated, settings, cards } = data.user
      this.setAccessToken(data.accessToken)
      userApi.addToken(data.accessToken)
      this.setUser(id, email, isActivated, avatar, settings, cards)

      if (rememberMe) {
        await AsyncStorage.setItem('refreshData', JSON.stringify({
          refreshToken: data.refreshToken,
          id
        }))
      } else {
        await AsyncStorage.removeItem('refreshData')
      }
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
  logout = async (goToLoginScreen: () => void) => {
    try {
      await userApi.logout()
      await AsyncStorage.removeItem('refreshData')
      this.setUser(
        null,
        null,
        false,
        null,
        undefined,
        []
      )
      this.setAccessToken(null)
      goToLoginScreen()
    } catch (e) {
      alert.showAlertMessage('error', e.response.data.message)
    }
  }

  setUser(
    id: string | null,
    email: string | null,
    isActivated: boolean,
    avatar: string | null,
    settingsData: ISettings | undefined,
    cardsData: ICardData[]
  ) {
    this.setUserId(id)
    this.setUserEmail(email)
    this.setIsActivated(isActivated)
    this.setAvatar(avatar)

    settings.setSettings(settingsData)
    cards.setCards(cardsData)
  }
  setUserId(id: string | null) {
    this.userId = id
  }
  setAccessToken(token: string | null) {
    this.accessToken = token
  }
  setUserEmail(email: string | null) {
    this.email = email
  }
  setIsActivated(isActivated: boolean) {
    this.isActivated = isActivated
  }
  setAvatar(avatar: string | null) {
    this.avatar = avatar
  }
}

export default new Profile()
