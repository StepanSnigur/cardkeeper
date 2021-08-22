import React, { useState, useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import {
  StyleSheet,
  View,
  GestureResponderEvent,
} from 'react-native'
import { useTheme, Text } from 'react-native-paper'
import cardsData, { ICardData, IMovingCard } from '../store/cards'

import Card from '../components/Card'
import Preloader from '../components/Preloader'

const styles = StyleSheet.create({
  cardsWrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 20,
  },
  emptyListPlaceholder: {
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    fontSize: 16,
  },
})

const CARD_HEIGHT = 175
const SPACE_BETWEEN_CARDS = 25
const FULL_CARD_HEIGHT = CARD_HEIGHT + SPACE_BETWEEN_CARDS
const CARDS_TO_SHOW = 9

const prepareCards = (cards: ICardData[]) => cards.map((card, i) => ({
  ...card,
  isMoving: i === cards.length - 1
}))

const Cards = observer(() => {
  const [isLoading, setIsLoading] = useState(false)
  const [initialCoors, setInitialCoords] = useState(0)
  const [scrolled, setScrolled] = useState(0)
  const [cards, setCards] = useState<IMovingCard[]>([])
  const topScrollHeight = useRef<number>(0)
  const { colors } = useTheme()

  useEffect(() => {
    if (cardsData.list.length) {
      const cards = prepareCards(cardsData.list)

      setCards(() => {
        let prevCardIndent = 0
        return cards.map((card, i) => {
          const cardInitialPosition = getInitialCardPosition(i, cards.length, prevCardIndent)
          prevCardIndent = cardInitialPosition
          if (i === cards.length - 1) {
            setScrolled(cardInitialPosition * -1)
            topScrollHeight.current = cardInitialPosition * -1
          }
          return {
            ...card,
            pos: cardInitialPosition,
            initialPos: cardInitialPosition
          }
        })
      })
    } else if (!cardsData.list.length) {
      setCards([])
    }
  }, [cardsData.list])

  // moving cards on scroll
  useEffect(() => {
    setCards(cards => {
      const newCards = [...cards].reverse()
      return newCards.map((card, i) => {
        if (checkCanMove(newCards, i)) card = { ...card, isMoving: true }
        return {
          ...card,
          pos: card.isMoving ? calculateCardPosition(i, card.initialPos!) : card.pos
        }
      }).reverse()
    })
  }, [scrolled])

  const checkCanMove = (cards: IMovingCard[], cardIdx: number) => {
    return cards[cardIdx - 1]
      && cards[cardIdx - 1].isMoving
      && cards[cardIdx - 1].pos - cards[cardIdx].pos > FULL_CARD_HEIGHT
  }
  const getInitialCardPosition = (i: number, cardsCount: number, prevCardPosition: number) => {
    if (cardsCount - i > CARDS_TO_SHOW) {
      return 0
    } else {
      return prevCardPosition ? prevCardPosition * 1.3 + 10 : 10
    }
  }
  const calculateCardPosition = (cardIdx: number, initialPosition: number) => {
    const newPosition = (scrolled + cardIdx * FULL_CARD_HEIGHT) * -1
    const maxTopIndent = FULL_CARD_HEIGHT * (cards.length - 1 - cardIdx)

    if (newPosition < initialPosition) return initialPosition
    if (newPosition > maxTopIndent) return maxTopIndent
    return newPosition
  }
  const handleTap = (e: GestureResponderEvent) => {
    setInitialCoords(e.nativeEvent.pageY)
  }
  const handleScroll = (e: GestureResponderEvent) => {
    const deltaY = initialCoors - e.nativeEvent.pageY

    if (checkStopScroll(deltaY)) return false

    setScrolled(scrolled + deltaY)
    setInitialCoords(e.nativeEvent.pageY)
  }
  const checkStopScroll = (deltaY: number) => {
    return cards.length <= 1
      || (scrolled > topScrollHeight.current  && deltaY > 0)
      || (cards[1].pos >= FULL_CARD_HEIGHT && deltaY < 0)
  }
  const handleTouchEnd = () => {
    setInitialCoords(0)
  }

  if (isLoading) return <Preloader />
  if (!cards.length) return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Text style={styles.emptyListPlaceholder}>
        Список карт пока пуст
      </Text>
    </View>
  )

  return (
    <View
      style={[styles.cardsWrapper, { backgroundColor: colors.background }]}
      onMoveShouldSetResponder={() => true}
      onTouchStart={handleTap}
      onResponderMove={handleScroll}
      onTouchEnd={handleTouchEnd}
    >
      {cards.map((card) => (
        <Card
          key={card._id}
          topIndent={card.pos}
          frontFaceUri={card.frontFace}
        />
      ))}
    </View>
  )
})

export default Cards
