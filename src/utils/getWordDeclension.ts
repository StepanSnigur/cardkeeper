const getWordDeclension = (word: string, num: number): string => {
  const lastNumDigit = +num.toString()[num.toString().length - 1]
  if (lastNumDigit >= 5 || lastNumDigit === 0 || (num >= 10 && num <= 20)) {
    return word.slice(0, word.length - 1)
  } else if (num === 1) {
    return word
  } else if (lastNumDigit >= 2 && lastNumDigit <= 4) {
    return `${word.slice(0, word.length - 1)}ы`
  } else {
    return word
  }
}

export default getWordDeclension
