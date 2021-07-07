import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme, Text } from 'react-native-paper'

const styles = StyleSheet.create({
  cardWrapper: {
    position: 'absolute',
    width: '80%',
    height: 175,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 3,
    borderColor: '#000',
    borderStyle: 'solid',
    borderWidth: 1
  },
  cardText: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  }
})

interface ICard {
  topIndent: number
}

const Card: React.FC<ICard> = ({ topIndent }) => {
  const { colors } = useTheme()

  return (
    <View style={[styles.cardWrapper, { backgroundColor: colors.primary, top: topIndent + 30 }]}>
      <Text style={styles.cardText}>card</Text>
    </View>
  )
}

export default Card
