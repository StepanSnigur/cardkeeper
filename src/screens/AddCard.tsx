import React from 'react'
import { observer } from 'mobx-react-lite'
import { StyleSheet, View } from 'react-native'
import { useTheme, Text } from 'react-native-paper'
import cards from '../store/cards'

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
})

const AddCard = observer(() => {
  const { colors } = useTheme()

  return (
    <View style={[styles.wrapper, { backgroundColor: colors.background }]}>
      <Text>add card</Text>
      <Text onPress={() => cards.addCard('', '')}>test</Text>
      <Text onPress={cards.deleteCards}>delete</Text>
    </View>
  )
})

export default AddCard
