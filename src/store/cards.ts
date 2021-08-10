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
      runInAction(() => {
        this.list = parsedCards
      })
    } catch (e) {
      this.error = 'Ошибка загрузки'
    }
  }
  addCard = async (frontFace: string, backFace: string) => {
    try {
      const card = { frontFace, backFace }
      const newList = [...this.list, card]
      await AsyncStorage.setItem('cards', JSON.stringify(newList))
      runInAction(() => {
        this.list = newList
      })
    } catch (e) {
      this.error = 'Ошибка добавления карты'
    }
  }
  deleteCards = async () => {
    try {
      await AsyncStorage.removeItem('cards')
      runInAction(() => {
        this.list = []
      })
    } catch (e) {
      this.error = 'Ошибка удаления'
    }
  }
}

export default new Cards()
