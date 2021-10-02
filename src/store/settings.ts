import { makeAutoObservable, runInAction } from 'mobx'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type enterTypeValue = 'default' | 'fingerprint' | 'auto'
type IEnterTypes = { label: string, value: enterTypeValue }
export const enterTypes: IEnterTypes[] = [
  { label: 'по умолчанию', value: 'default' },
  { label: 'по отпечатку', value: 'fingerprint' },
  { label: 'автоматически', value: 'auto' },
]
export interface ISettings {
  darkTheme: boolean,
  enterType: string,
}
export type settingsKeys = keyof ISettings

class Settings implements ISettings {
  // default settings
  darkTheme = true
  enterType = enterTypes[0].value

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
  setSettings(settings?: ISettings) {
    if (settings) {
      Object.keys(settings).forEach(key => {
        const settingKey = key as settingsKeys
        // @ts-ignore
        this[settingKey] = settings[settingKey]
      })
    }
  }
  clearSettings = async () => {
    await AsyncStorage.removeItem('defaultSettings')
    runInAction(() => {
      this.darkTheme = true
      this.enterType = enterTypes[0].value
    })
  }

  changeDarkTheme = async () => {
    this.darkTheme = !this.darkTheme
    await AsyncStorage.setItem('defaultSettings', JSON.stringify(this))
  }
  changeEnterType = async (enterType: enterTypeValue) => {
    this.enterType = enterType
    await AsyncStorage.setItem('defaultSettings', JSON.stringify(this))
  }
}

export default new Settings()
