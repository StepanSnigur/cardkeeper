import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { useTheme, Text } from 'react-native-paper'
import cardsData, { ICardData } from '../store/cards'
import cardInfo from '../store/cardInfo'

import Card from '../components/Card'
import Preloader from '../components/Preloader'

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  cardsWrapper: {
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

const Cards = observer(() => {
  const [isLoading, setIsLoading] = useState(false)
  const { colors } = useTheme()

  const handleOpenCard = (cardData: ICardData) => {
    cardInfo.openCard(cardData)
  }

  if (isLoading) return <Preloader />
  if (!cardsData.list.length) return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Text style={styles.emptyListPlaceholder}>
        Список карт пока пуст
      </Text>
    </View>
  )

  return (
    <SafeAreaView style={[styles.scrollContainer, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.cardsWrapper}>
        {cardsData.list.map((card) => (
          <TouchableOpacity
            style={{ width: '100%' }}
            activeOpacity={1}
            onPress={() => handleOpenCard(card)}
            key={card._id}
          >
            <Card frontFaceUri={card.frontFace} name={card.cardName} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
})

export default Cards
