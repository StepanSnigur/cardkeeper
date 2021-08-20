import { makeAutoObservable, runInAction } from 'mobx'
import AsyncStorage from '@react-native-async-storage/async-storage'

export interface ICardData {
  frontFace: string,
  backFace: string,
  initialPos?: number,
  pos?: number,
  isMoving?: boolean
}
export interface IMovingCard extends ICardData {
  pos: number
}

class Cards {
  list: ICardData[] = []
  error: string | boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  loadCards = async () => {
    try {
      const cards = await AsyncStorage.getItem('cards') || JSON.stringify([])
      const parsedCards = JSON.parse(cards)
      this.setCards(parsedCards)
    } catch (e) {
      this.error = 'Ошибка загрузки'
    }
  }
  addCard = async (frontFace: string, backFace: string) => {
    const card = { frontFace, backFace }
    const newList = [...this.list, card]
    await AsyncStorage.setItem('cards', JSON.stringify(newList))
    this.setCards(newList)
  }
  deleteCards = async () => {
    try {
      await AsyncStorage.removeItem('cards')
      this.setCards([])
    } catch (e) {
      this.error = 'Ошибка удаления'
    }
  }
  setCards = (cards: ICardData[]) => {
    this.list = cards
  }
}

export default new Cards()
