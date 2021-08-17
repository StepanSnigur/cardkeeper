import { makeAutoObservable } from 'mobx'

export const ALERT_COLORS = {
  info: { icon: 'info-outline', color: '#17a2b8' },
  error: { icon: 'error-outline', color: '#dc3545' },
  log: { icon: 'info-outline', color: '#343a40' },
}

class AlertStore {
  alertType: 'info' | 'error' | 'log' = 'error'
  alertMessage: string = ''

  constructor() {
    makeAutoObservable(this)
  }

  showAlertMessage = (type: keyof typeof ALERT_COLORS, message: string) => {
    this.setAlertData(type, message)
    setTimeout(() => this.setAlertData(type, ''), 3000)
  }
  setAlertData = (type: keyof typeof ALERT_COLORS, message: string) => {
    this.alertType = type
    this.alertMessage = message
  }
}

export default new AlertStore()
