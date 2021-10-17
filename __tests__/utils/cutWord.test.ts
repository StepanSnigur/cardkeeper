import { cutWord } from '../../src/utils/сutWord'

describe('cutWord', () => {
  it('Correct cuts a word', () => {
    const word = 'test word'
    const length = 4
    const res = cutWord(word, length)

    expect(res).toEqual('test...')
  })
  it('Correct cuts a word with a longer length', () => {
    const word = 'test'
    const length = 5
    const res = cutWord(word, length)

    expect(res).toEqual(word)
  })
  it('Correct cuts a word with same length', () => {
    const word = 'test'
    const length = 4
    const res = cutWord(word, length)

    expect(res).toEqual(word)
  })
})
