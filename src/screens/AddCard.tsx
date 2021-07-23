import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme, Text } from 'react-native-paper'

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
})

const AddCard = () => {
  const { colors } = useTheme()

  return (
    <View style={[styles.wrapper, { backgroundColor: colors.background }]}>
      <Text>add card</Text>
    </View>
  )
}

export default AddCard
