import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { useTheme, Text, IconButton } from 'react-native-paper'
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
    zIndex: 1,
    backgroundColor: '#000',
    opacity: .5,
    borderRadius: 5,
    padding: 5,
  },
  cardFace: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  floatElement: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 2,
  },
})

interface ICard {
  frontFaceUri: string
  name?: string
  isDragging?: boolean
}

const Card: React.FC<ICard> = ({ frontFaceUri, name, isDragging }) => {
  const [image, setImage] = useState<string | null>(null)
  const [isError, setIsError] = useState(false)
  const { colors } = useTheme()

  useEffect(() => {
    loadImage()
  }, [])

  const loadImage = async () => {
    try {
      setIsError(false)
      const base64FrontFace = await fileApi.getFile(frontFaceUri)
      setImage(base64FrontFace)
    } catch (e) {
      setIsError(true)
    }
  }

  return (
    <View style={[styles.cardWrapper, {
      backgroundColor: colors.surface
    }]}>
      {isDragging ? null : <Image
        source={{ uri: `data:image/png;base64,${image}` }}
        style={styles.cardFace}
      />}
      {name ? <Text style={styles.cardText}>{name}</Text> : null}
      {isError ? <IconButton
        icon="alert-circle"
        style={styles.floatElement}
        size={20}
        onPress={loadImage}
      /> : null}
    </View>
  )
}

export default Card
