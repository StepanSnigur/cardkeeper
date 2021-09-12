import getWordDeclension from '../../src/utils/getWordDeclension'

describe('getWordDeclension', () => {
  it ('Works correctly on passing 0', () => {
    expect(getWordDeclension('карта', 0)).toBe('карт')
  })
  it ('Works correctly on passing 1', () => {
    expect(getWordDeclension('карта', 1)).toBe('карта')
  })
  it('Works correctly in range 2-4', () => {
    for (let i = 2; i <= 4; i++) {
      expect(getWordDeclension('карта', i)).toBe('карты')
    }
  })
  it('Works correctly in range 5-20', () => {
    for (let i = 5; i <= 20; i++) {
      expect(getWordDeclension('карта', i)).toBe('карт')
    }
  })
  it('Works correctly on passing 21', () => {
    expect(getWordDeclension('карта', 21)).toBe('карта')
  })
  it('Works correctly in range 22-24', () => {
    for (let i = 22; i <= 24; i++) {
      expect(getWordDeclension('карта', i)).toBe('карты')
    }
  })
  it('Works correctly in range 25-30', () => {
    for (let i = 25; i <= 30; i++) {
      expect(getWordDeclension('карта', i)).toBe('карт')
    }
  })
  it('Works correctly in range 25-30', () => {
    for (let i = 25; i <= 30; i++) {
      expect(getWordDeclension('карта', i)).toBe('карт')
    }
  })
  it('Works correctly in range 110-120', () => {
    for (let i = 25; i <= 30; i++) {
      expect(getWordDeclension('карта', i)).toBe('карт')
    }
  })
})
