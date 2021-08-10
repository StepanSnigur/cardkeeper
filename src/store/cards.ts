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

  constructor() {
    makeAutoObservable(this)
  }

  loadCards = async () => {
    const cards = await AsyncStorage.getItem('cards') || JSON.stringify([])
    const parsedCards = JSON.parse(cards)
    if (parsedCards.length) parsedCards[parsedCards.length - 1].isMoving = true
    runInAction(() => {
      this.list = parsedCards
    })
  }
  addCard = async (frontFace: string, backFace: string) => {
    const card = { frontFace, backFace }
    runInAction(() => {
      this.list = [...this.list, card]
    })
    await AsyncStorage.setItem('cards', JSON.stringify(this.list))
  }
  deleteCards = async () => {
    await AsyncStorage.removeItem('cards')
    runInAction(() => {
      this.list = []
    })
  }
}

export default new Cards()
