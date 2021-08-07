import { makeAutoObservable } from 'mobx'

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

  switchSetting(name: keyof ISettings) {
    this[name] = !this[name]
  }
}
export const titles: ISettingsTitles = {
  darkTheme: 'Темная тема',
  fingerprint: 'Вход по отпечатку'
}

export default new Settings()
