import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { useTheme, Text } from 'react-native-paper'
import fileApi from '../api/fileApi'

const styles = StyleSheet.create({
  cardWrapper: {
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
    marginBottom: 20,
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
  frontFaceUri: string
}

const Card: React.FC<ICard> = ({ frontFaceUri }) => {
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
    <View style={[styles.cardWrapper, {
      backgroundColor: colors.primary,
    }]}>
      <Image
        source={{ uri: `data:image/png;base64,${image}` }}
        style={styles.cardFace}
      />
      <Text style={styles.cardText}>card</Text>
    </View>
  )
}

export default Card
