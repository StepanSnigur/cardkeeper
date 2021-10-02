import { makeAutoObservable } from 'mobx'
import AsyncStorage from '@react-native-async-storage/async-storage'
import userApi from '../api/userApi'
import settings from './settings'
import cards, { ICardData } from './cards'
import alert from './alert'

class Profile {
  email: string | null = null
  avatar: string | null = null
  userId: string | null = null
  accessToken: string | null = null
  refreshToken: string | null = null
  isActivated: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  saveUserLoginData = async () => {
    try {
      return await AsyncStorage.setItem('refreshData', JSON.stringify({
        id: this.userId,
        refreshToken: this.refreshToken,
      }))
    } catch (e) {
      alert.showAlertMessage('error', 'Непредвиденная ошибка')
    }
  }
  checkAutoLogin = async () => {
    try {
      const refreshData = await AsyncStorage.getItem('refreshData')
      if (!refreshData) throw new Error()
      const { id, refreshToken } = JSON.parse(refreshData)
      if (!id || !refreshToken) throw new Error()

      const data = await userApi.autoLogin(id, refreshToken)
      const { email, isActivated, avatar, cards } = data.user
      this.setAccessToken(data.accessToken)
      this.setRefreshToken(data.refreshToken)
      this.setUser(id, email, isActivated, avatar, cards)
    } catch (e) {
      alert.showAlertMessage('error', 'Вход в приложение не удался')
    }
  }
  logUserIn = async (email: string, password: string, rememberMe: boolean) => {
    try {
      const data = await userApi.login(email, password)
      const { id, avatar, isActivated, cards } = data.user
      this.setAccessToken(data.accessToken)
      this.setRefreshToken(data.refreshToken)
      userApi.addToken(data.accessToken)
      this.setUser(id, email, isActivated, avatar, cards)

      if (rememberMe) {
        await this.saveUserLoginData()
        settings.changeEnterType('auto')
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

      cards.setCards(data.user.cards)
    } catch (e) {
      alert.showAlertMessage('error', e.response.data.message)
    }
  }
  logout = async (goToLoginScreen: () => void) => {
    try {
      await userApi.logout()
      await AsyncStorage.removeItem('refreshData')
      await settings.clearSettings()
      this.setUser(
        null,
        null,
        false,
        null,
        []
      )
      this.setAccessToken(null)
      this.setRefreshToken(null)
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
    cardsData: ICardData[]
  ) {
    this.setUserId(id)
    this.setUserEmail(email)
    this.setIsActivated(isActivated)
    this.setAvatar(avatar)

    cards.setCards(cardsData)
  }
  setUserId(id: string | null) {
    this.userId = id
  }
  setAccessToken(token: string | null) {
    this.accessToken = token
  }
  setRefreshToken(token: string | null) {
    this.refreshToken = token
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
