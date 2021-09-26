import React, { useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import { useTheme, Text } from 'react-native-paper'
import DraggableFlatList, {
  RenderItemParams,
  DragEndParams,
} from 'react-native-draggable-flatlist'
import cardsData, { ICardData } from '../store/cards'
import cardInfo from '../store/cardInfo'

import Card from '../components/Card'

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    paddingTop: 30,
  },
  emptyListPlaceholder: {
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    fontSize: 16,
  },
})

const Cards = observer(() => {
  const { colors } = useTheme()

  const handleOpenCard = (cardData: ICardData) => {
    cardInfo.openCard(cardData)
  }

  const renderCards = useCallback(
    ({ item, drag, isActive }: RenderItemParams<ICardData>) => {
      return (
        <TouchableOpacity
          style={{ width: '100%' }}
          activeOpacity={1}
          onPress={() => handleOpenCard(item)}
          onLongPress={drag}
        >
          <Card
            frontFaceUri={item.frontFace}
            name={item.cardName}
            isDragging={isActive}
          />
        </TouchableOpacity>
      )
    },
    []
  )
  const getCardsKeys = (card: ICardData) => `draggable-item-${card._id}`
  const handleDragEnd = ({ data }: DragEndParams<ICardData>) => {
    cardsData.setCards(data)
  }

  if (!cardsData.filteredCards.length) return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Text style={styles.emptyListPlaceholder}>
        Список карт пуст
      </Text>
    </View>
  )

  return (
    <View style={[styles.scrollContainer, { backgroundColor: colors.background }]}>
      <DraggableFlatList
        data={cardsData.filteredCards}
        renderItem={renderCards}
        keyExtractor={getCardsKeys}
        onDragEnd={handleDragEnd}
      />
    </View>
  )
})

export default Cards
