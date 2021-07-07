import React, { useState, useEffect } from 'react'
import { StyleSheet, View, GestureResponderEvent } from 'react-native'
import { useTheme } from 'react-native-paper'

import Card from '../components/Card'

interface ICardData {
  pos?: number,
  img: string,
  isMoving?: boolean
}
const styles = StyleSheet.create({
  cardsWrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 20,
    position: 'relative',
  },
})

const initialCards: ICardData[] = [
  {img: ''},
  {img: ''},
  {img: ''},
  {img: ''},
  {img: ''},
  {img: ''},
  {img: ''},
  {img: ''},
  {img: ''},
  {img: ''},
  {img: ''},
  {img: ''},
]
const CARDS_TO_SHOW = 6
const CARD_HEIGHT = 175

const Cards = () => {
  const [initialCoors, setInitialCoords] = useState(0)
  const [memoizedDelta, setMemoizedDelta] = useState<number | null>(null)
  const [cards, setCards] = useState<ICardData[]>(initialCards)
  const { colors } = useTheme()

  useEffect(() => {
    setCards((cards) => {
      let prevCardIndent = 0
      return cards.map((card, i) => {
        const cardPosition = calculateCardPosition(i, cards.length, prevCardIndent)
        prevCardIndent = cardPosition
        return {
          ...card,
          pos: cardPosition,
          isMoving: i >= cards.length - 2
        }
      })
    })
  }, [initialCards])

  const calculateCardPosition = (cardIdx: number, cardsCount: number, prevCardIndent: number = 0) => {
    if (cardsCount - cardIdx > CARDS_TO_SHOW) {
      return 0
    } else {
      return prevCardIndent ? prevCardIndent * 2 : 10
    }
  }
  const checkOverlapping = (card1: ICardData, card2: ICardData) => {
    if (!card1 || !card2) return false
    return card2.pos! - card1.pos! > 60
  }
  const moveCards = (deltaY: number) => {
    setCards((cards) => {
      return cards.map((card, i) => {
        if (!card.isMoving) return card
        // TODO deltaY может принимать слишком большие значения изза чего возникает разрыв между карточек
        // TODO попробовать переделать на скролл
        // console.log(deltaY)
        if (Math.abs(deltaY) > 210) deltaY = 210 * (deltaY / Math.abs(deltaY))
        const newPos = card.pos! - deltaY / 10
        const isOverlapping = checkOverlapping(cards[i - 1], card)
        if (isOverlapping) cards[i - 1].isMoving = true
        return {
          ...card,
          pos: newPos > 0 ? newPos : 0,
          isMoving: isOverlapping
        }
      })
    })
  }
  const handleTap = (e: GestureResponderEvent) => {
    setInitialCoords(e.nativeEvent.pageY)
    return true
  }
  const handleScroll = (e: GestureResponderEvent) => {
    moveCards(initialCoors - e.nativeEvent.pageY)
  }
  const handleTouchEnd = (e: GestureResponderEvent) => {
    setInitialCoords(0)
  }

  return (
    <View
      style={[styles.cardsWrapper, { backgroundColor: colors.background }]}
      onMoveShouldSetResponder={() => true}
      onTouchStart={handleTap}
      onResponderMove={handleScroll}
      onTouchEnd={handleTouchEnd}
    >
      {cards.map((card, i) => (
        <Card
          key={i}
          topIndent={card.pos || 0}
        />
      ))}
    </View>
  )
}

export default Cards
