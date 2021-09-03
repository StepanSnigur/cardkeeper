import { makeAutoObservable } from 'mobx'
import { ICardData } from './cards'

class CardInfo {
  activeCard: ICardData | null = null
  isOpen: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  openCard = (card: ICardData) => {
    this.activeCard = card
    this.isOpen = true
  }
  closeCard = () => {
    this.isOpen = false
  }
}

export default new CardInfo()
