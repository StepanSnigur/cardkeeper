import cards from '../../src/store/cards'
// @ts-ignore
import { getItem, setItem, removeItem } from '@react-native-async-storage/async-storage'

const mockCardsData = [
  { frontFace: '', backFace: '' },
  { frontFace: '', backFace: '' },
  { frontFace: '', backFace: '' },
]
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn()
}))

describe('Cards store', () => {
  beforeEach(async () => {
    getItem.mockImplementation(() => Promise.resolve(JSON.stringify(mockCardsData)))
    setItem.mockImplementation(() => Promise.resolve(1))
    removeItem.mockImplementation(() => Promise.resolve(1))
    await cards.deleteCards()
    cards.error = false
  })

  it('Correct load cards', async () => {
    await cards.loadCards()
    expect(cards.list).toEqual(mockCardsData)
    expect(cards.error).toBe(false)
  })
  it('Correct add card', async () => {
    await cards.addCard('', '')
    expect(cards.list.length).toBe(1)
    expect(cards.error).toBe(false)
  })
  it('Correct delete cards', async () => {
    await cards.addCard('', '')
    await cards.addCard('', '')
    expect(cards.list.length).toBe(2)
    await cards.deleteCards()
    expect(cards.list.length).toBe(0)
    expect(cards.error).toBe(false)
  })

  it('Returns correct error on load', async () => {
    getItem.mockImplementation(() => Promise.reject())
    await cards.loadCards()
    expect(cards.list).toEqual([])
    expect(cards.error).toBeTruthy()
  })
  it('Returns correct error on delete', async () => {
    await cards.addCard('', '')
    expect(cards.list.length).toBe(1)

    removeItem.mockImplementation(() => Promise.reject())
    await cards.deleteCards()
    expect(cards.list.length).toEqual(1)
    expect(cards.error).toBeTruthy()
  })
})
