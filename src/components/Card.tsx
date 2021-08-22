import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { useTheme, Text } from 'react-native-paper'
import fileApi from '../api/fileApi'

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
    borderWidth: 1,
    marginRight: 'auto',
    marginLeft: 'auto',
    overflow: 'hidden',
  },
  cardText: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  cardFace: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
})

interface ICard {
  topIndent: number,
  frontFaceUri: string
}
const CARD_TOP_MARGIN = 30

const Card: React.FC<ICard> = ({ topIndent, frontFaceUri }) => {
  const [image, setImage] = useState<string | null>(null)
  const { colors } = useTheme()

  useEffect(() => {
    const init = async () => {
      try {
        const base64FrontFace = await fileApi.getFile(frontFaceUri)
        setImage(base64FrontFace)
      } catch (e) {
        console.log(e.message)
      }
    }
    init()
  }, [])

  return (
    <View style={[styles.cardWrapper, { backgroundColor: colors.primary, top: topIndent + CARD_TOP_MARGIN }]}>
      <Image
        source={{ uri: `data:image/png;base64,${image}` }}
        style={styles.cardFace}
      />
      <Text style={styles.cardText}>card</Text>
    </View>
  )
}

export default Card
