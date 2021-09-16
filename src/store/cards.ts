import { makeAutoObservable } from 'mobx'
import AsyncStorage from '@react-native-async-storage/async-storage'
import userApi from '../api/userApi'
import alert from './alert'

export interface ICardData {
  _id: string,
  frontFace: string,
  backFace: string,
  qrCodes: string[],
  cardName: string,
}

class Cards {
  list: ICardData[] = []
  error: string | boolean = false
  searchTerm: string = ''

  constructor() {
    makeAutoObservable(this)
  }

  addCard = async (
    frontFace: string, // base64
    backFace: string, // base64
    qrCodes: string[],
    cardName: string,
    checkLoadProgress: (e: ProgressEvent) => void
  ) => {
    const cards = await userApi.addCard(
      frontFace,
      backFace,
      qrCodes,
      cardName,
      checkLoadProgress,
    )
    this.setCards(cards)
  }
  deleteCards = async () => {
    try {
      await AsyncStorage.removeItem('cards')
      this.setCards([])
    } catch (e) {
      this.error = 'Ошибка удаления'
    }
  }
  changeCardName = async (id: string, newCardName: string) => {
    try {
      const newCards = await userApi.changeCardName(id, newCardName)
      this.setCards(newCards)
    } catch (e) {
      alert.showAlertMessage('error', 'Ошибка при изменении карты')
    }
  }
  deleteCard = async (id: string) => {
    try {
      await userApi.deleteCard(id)
      this.removeCard(id)
    } catch (e) {
      alert.showAlertMessage('error', 'Ошибка удаления карты')
    }
  }

  get filteredCards() {
    return this.list.filter(card => card
      .cardName
      .toLocaleLowerCase()
      .includes(this.searchTerm.toLocaleLowerCase()))
  }

  setCards = (cards: ICardData[]) => {
    this.list = cards
  }
  removeCard = (id: string) => {
    this.list = this.list.filter(card => card._id !== id)
  }
  setSearchTerm = (searchTerm: string) => {
    this.searchTerm = searchTerm
  }
}

export default new Cards()
