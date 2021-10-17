export const cutWord = (word: string, length: number) => {
  return word.length > length
    ? `${word.slice(0, length)}...`
    : word
}
