import { makeAutoObservable, runInAction } from 'mobx'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface ISettings {
  darkTheme: boolean,
  fingerprint: boolean
}
export type settingsKeys = keyof ISettings
type ISettingsTitles = {
  [key in settingsKeys]: string
}
class Settings implements ISettings {
  darkTheme = true
  fingerprint = false

  constructor() {
    makeAutoObservable(this)
  }

  async getDefaultSettings() {
    try {
      const defaultSettings = await AsyncStorage.getItem('defaultSettings') || null
      if (!defaultSettings) return
      const parsedSettings: ISettings = JSON.parse(defaultSettings)
      this.setSettings(parsedSettings)
    } catch (e) {
      throw new Error('Ошибка получения настроек пользователя')
    }
  }
  async switchSetting(name: keyof ISettings) {
    try {
      this[name] = !this[name]
      await AsyncStorage.setItem('defaultSettings', JSON.stringify(this))
    } catch (e) {
      throw new Error('Ошибка сохранения настроек пользователя')
    }
  }
  setSettings(settings: ISettings) {
    Object.keys(settings).forEach(key => {
      const settingKey = key as settingsKeys
      this[settingKey] = settings[settingKey]
    })
  }
}
export const titles: ISettingsTitles = {
  darkTheme: 'Темная тема',
  fingerprint: 'Вход по отпечатку'
}

export default new Settings()
